import { GenderType, PartType } from "./GodMetadata.js";
import partsData, { ImageInfo, PartCategory, PartItem } from "./partsData.js";

interface MetadataParts {
  [key: string]: string;
}

interface ImagePart {
  traitId: number;
  partId: number;
  images: ImageInfo[];
  order: number;
}

class PartsManager {
  public getPartCategory(type: PartType, gender: GenderType): PartCategory[] {
    return partsData[type][gender];
  }

  public getDefaultParts(type: PartType, gender: GenderType): MetadataParts {
    const category = this.getPartCategory(type, gender);
    const defaultParts: MetadataParts = {};

    category.forEach((trait) => {
      if (trait.parts.length > 0) {
        defaultParts[trait.name] = trait.parts[0].name;
      }
    });

    return defaultParts;
  }

  private isPartAvailable(
    part: PartItem,
    currentParts: MetadataParts,
  ): boolean {
    if (!part.condition) return true;
    return part.condition.values.includes(currentParts[part.condition.trait]);
  }

  public getAvailableParts(
    type: PartType,
    gender: GenderType,
    currentParts: MetadataParts,
  ): ImagePart[] {
    const category = this.getPartCategory(type, gender);
    const imageParts: ImagePart[] = [];

    category.forEach((trait, traitId) => {
      trait.parts.forEach((part, partId) => {
        if (
          this.isPartAvailable(part, currentParts) &&
          currentParts[trait.name] === part.name
        ) {
          const images = part.images || [];
          images.forEach((image) => {
            imageParts.push({
              traitId,
              partId,
              images,
              order: image.order,
            });
          });
        }
      });
    });

    return imageParts.sort((a, b) => a.order - b.order);
  }

  public validatePartCombination(
    type: PartType,
    gender: GenderType,
    parts: MetadataParts,
  ): boolean {
    const availableParts = this.getAvailableParts(type, gender, parts);
    const requiredPartNames = new Set(
      this.getPartCategory(type, gender)
        .filter((trait) => !trait.parts.some((part) => part.name === "None"))
        .map((trait) => trait.name),
    );

    const selectedPartNames = new Set(
      availableParts.map((part) =>
        this.getPartCategory(type, gender)[part.traitId].name
      ),
    );

    return [...requiredPartNames].every((name) => selectedPartNames.has(name));
  }

  public getAvailablePartsForTrait(
    type: PartType,
    gender: GenderType,
    traitName: string,
    currentParts: MetadataParts,
  ): PartItem[] {
    const category = this.getPartCategory(type, gender);
    const trait = category.find((t) => t.name === traitName);

    if (!trait) return [];

    return trait.parts.filter((part) =>
      this.isPartAvailable(part, currentParts)
    );
  }
}

export default new PartsManager();
