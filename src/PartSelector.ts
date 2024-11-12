import GodMetadata from "./GodMetadata.js";
import partsData from "./partsData.js";

class PartSelector {
  public getAvailableTraits(metadata: GodMetadata): any[] {
    const parts = this.getPartsDataForMetadata(metadata);
    return parts.filter((trait) => this.isTraitAvailable(trait, metadata));
  }

  public getAvailablePartsForTrait(trait: any, metadata: GodMetadata): any[] {
    return trait.parts.filter((part: any) =>
      this.isPartAvailable(part, metadata)
    );
  }

  public getSelectedParts(metadata: GodMetadata): any[] {
    const parts = this.getPartsDataForMetadata(metadata);
    const selectedParts: any[] = [];

    for (const trait of parts) {
      if (this.isTraitAvailable(trait, metadata)) {
        const selectedPartName = metadata.parts[trait.name];
        const selectedPart = trait.parts.find(
          (part: any) =>
            part.name === selectedPartName &&
            this.isPartAvailable(part, metadata),
        );
        if (selectedPart) {
          selectedParts.push({ trait: trait.name, part: selectedPart });
        }
      }
    }

    return selectedParts;
  }

  private getPartsDataForMetadata(metadata: GodMetadata): any[] {
    const { type, gender } = metadata;
    return partsData[type][gender];
  }

  private isTraitAvailable(trait: any, metadata: GodMetadata): boolean {
    if (!trait.condition) {
      return true;
    }
    const traitValue = metadata.parts[trait.condition.trait];
    return trait.condition.values.includes(traitValue);
  }

  private isPartAvailable(part: any, metadata: GodMetadata): boolean {
    if (!part.condition) {
      return true;
    }
    const traitValue = metadata.parts[part.condition.trait];
    return part.condition.values.includes(traitValue);
  }
}

export default new PartSelector();
