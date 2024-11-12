import { GenderType, PartType } from "./GodMetadata.js";
import { ImageInfo, PartCategory, PartItem } from "./partsData.js";
interface MetadataParts {
    [key: string]: string;
}
interface ImagePart {
    traitId: number;
    partId: number;
    images: ImageInfo[];
    order: number;
}
declare class PartsManager {
    getPartCategory(type: PartType, gender: GenderType): PartCategory[];
    getDefaultParts(type: PartType, gender: GenderType): MetadataParts;
    private isPartAvailable;
    getAvailableParts(type: PartType, gender: GenderType, currentParts: MetadataParts): ImagePart[];
    validatePartCombination(type: PartType, gender: GenderType, parts: MetadataParts): boolean;
    getAvailablePartsForTrait(type: PartType, gender: GenderType, traitName: string, currentParts: MetadataParts): PartItem[];
}
declare const _default: PartsManager;
export default _default;
//# sourceMappingURL=PartsManager.d.ts.map