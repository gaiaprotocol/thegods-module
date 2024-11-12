import partsData from "./partsData.js";
class PartSelector {
    getAvailableTraits(metadata) {
        const parts = this.getPartsDataForMetadata(metadata);
        return parts.filter((trait) => this.isTraitAvailable(trait, metadata));
    }
    getAvailablePartsForTrait(trait, metadata) {
        return trait.parts.filter((part) => this.isPartAvailable(part, metadata));
    }
    getSelectedParts(metadata) {
        const parts = this.getPartsDataForMetadata(metadata);
        const selectedParts = [];
        for (const trait of parts) {
            if (this.isTraitAvailable(trait, metadata)) {
                const selectedPartName = metadata.parts[trait.name];
                const selectedPart = trait.parts.find((part) => part.name === selectedPartName &&
                    this.isPartAvailable(part, metadata));
                if (selectedPart) {
                    selectedParts.push({ trait: trait.name, part: selectedPart });
                }
            }
        }
        return selectedParts;
    }
    getPartsDataForMetadata(metadata) {
        const { type, gender } = metadata;
        return partsData[type][gender];
    }
    isTraitAvailable(trait, metadata) {
        if (!trait.condition) {
            return true;
        }
        const traitValue = metadata.parts[trait.condition.trait];
        return trait.condition.values.includes(traitValue);
    }
    isPartAvailable(part, metadata) {
        if (!part.condition) {
            return true;
        }
        const traitValue = metadata.parts[part.condition.trait];
        return part.condition.values.includes(traitValue);
    }
}
export default new PartSelector();
//# sourceMappingURL=PartSelector.js.map