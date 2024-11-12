import GodMetadata from "./GodMetadata.js";
declare class PartSelector {
    getAvailableTraits(metadata: GodMetadata): any[];
    getAvailablePartsForTrait(trait: any, metadata: GodMetadata): any[];
    getSelectedParts(metadata: GodMetadata): any[];
    private getPartsDataForMetadata;
    private isTraitAvailable;
    private isPartAvailable;
}
declare const _default: PartSelector;
export default _default;
//# sourceMappingURL=PartSelector.d.ts.map