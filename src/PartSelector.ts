import GodMetadata, { ElementType, GenderType } from "./GodMetadata.js";
import partsData, { Part, Trait } from "./partsData.js";

class PartSelector {
  public getTraits(type: ElementType, gender: GenderType): Trait[] {
    return partsData[type][gender];
  }

  private isPartAvailable(part: Part, metadata: GodMetadata): boolean {
    if (!part.condition) {
      return true;
    }

    let traitValue: string | undefined;

    if (part.condition.trait === "Type") {
      traitValue = metadata.type;
    } else if (part.condition.trait === "Gender") {
      traitValue = metadata.gender;
    } else {
      traitValue = metadata.parts[part.condition.trait];
    }

    if (!traitValue) {
      return false;
    }

    return part.condition.values.includes(traitValue);
  }

  public getAvailablePartsForTrait(
    trait: Trait,
    metadata: GodMetadata,
  ): Part[] {
    return trait.parts.filter((part) => this.isPartAvailable(part, metadata));
  }

  public getSelectedParts(metadata: GodMetadata): { [trait: string]: Part } {
    const traits = this.getTraits(metadata.type, metadata.gender);
    const selectedParts: { [trait: string]: Part } = {};

    for (const trait of traits) {
      const availableParts = this.getAvailablePartsForTrait(trait, metadata);
      const selectedPartName = metadata.parts[trait.name];
      const selectedPart = availableParts.find((part) =>
        part.name === selectedPartName
      );
      if (selectedPart) selectedParts[trait.name] = selectedPart;
    }

    return selectedParts;
  }

  public getDefaultParts(type: ElementType, gender: GenderType) {
    const traits = this.getTraits(type, gender);
    const defaultParts: { [trait: string]: string } = {};

    for (const trait of traits) {
      if (trait.parts.length > 0) {
        defaultParts[trait.name] = trait.parts[0].name;
      }
    }

    return defaultParts;
  }

  public validateMetadata(metadata: GodMetadata): string[] {
    const errors: string[] = [];
    const traits = this.getTraits(metadata.type, metadata.gender);

    for (const trait of traits) {
      const availableParts = this.getAvailablePartsForTrait(trait, metadata);
      const selectedPartName = metadata.parts[trait.name];

      if (availableParts.length === 0) {
        if (selectedPartName) {
          errors.push(
            `No parts are available for trait "${trait.name}", but a part "${selectedPartName}" is selected.`,
          );
        }
        continue;
      }

      if (!selectedPartName) {
        errors.push(`Missing part for trait "${trait.name}".`);
        continue;
      }

      const part = availableParts.find((p) => p.name === selectedPartName);

      if (!part) {
        errors.push(
          `Invalid part "${selectedPartName}" selected for trait "${trait.name}".`,
        );
        continue;
      }
    }

    return errors;
  }
}

export default new PartSelector();
