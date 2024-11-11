import partsData, {
  GenderType,
  ImageInfo,
  PartCategory,
  PartItem,
  PartType,
} from "./partsData.ts";

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
  private getParts(type: PartType, gender: GenderType): PartCategory[] {
    return partsData[type][gender];
  }

  public getDefaultParts(type: PartType, gender: GenderType): MetadataParts {
    const parts = this.getParts(type, gender);
    const defaultParts: MetadataParts = {};

    parts.forEach((trait) => {
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
    const parts = this.getParts(type, gender);
    const imageParts: ImagePart[] = [];

    parts.forEach((trait, traitId) => {
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
      this.getParts(type, gender)
        .filter((trait) => !trait.parts.some((part) => part.name === "None"))
        .map((trait) => trait.name),
    );

    const selectedPartNames = new Set(
      availableParts.map((part) =>
        this.getParts(type, gender)[part.traitId].name
      ),
    );

    return [...requiredPartNames].every((name) => selectedPartNames.has(name));
  }
}

export default new PartsManager();
