import GodMetadata, { ElementType, GenderType } from "./GodMetadata.js";
import { Part, Trait } from "./partsData.js";
declare class PartSelector {
    getAvailableTraits(metadata: GodMetadata): Trait[];
    getAvailablePartsForTrait(trait: Trait, metadata: GodMetadata): Part[];
    getSelectedParts(metadata: GodMetadata): {
        [trait: string]: Part;
    };
    getTraits(type: ElementType, gender: GenderType): Trait[];
    private isPartAvailable;
    getDefaultParts(type: ElementType, gender: GenderType): {
        [trait: string]: string;
    };
}
declare const _default: PartSelector;
export default _default;
//# sourceMappingURL=PartSelector.d.ts.map