import partsData from "./partsData.js";
class PartSelector {
    getAvailableTraits(metadata) {
        return this.getPartsDataForMetadata(metadata);
    }
    getAvailablePartsForTrait(trait, metadata) {
        return trait.parts.filter((part) => this.isPartAvailable(part, metadata));
    }
    getSelectedParts(metadata) {
        const parts = this.getPartsDataForMetadata(metadata);
        const selectedParts = {};
        for (const trait of parts) {
            const availableParts = this.getAvailablePartsForTrait(trait, metadata);
            const selectedPartName = metadata.parts[trait.name];
            const selectedPart = availableParts.find((part) => part.name === selectedPartName);
            if (selectedPart)
                selectedParts[trait.name] = selectedPart;
        }
        return selectedParts;
    }
    getPartsDataForMetadata(metadata) {
        const { type, gender } = metadata;
        return partsData[type][gender];
    }
    isPartAvailable(part, metadata) {
        if (!part.condition) {
            return true;
        }
        let traitValue;
        if (part.condition.trait === "Type") {
            traitValue = metadata.type;
        }
        else if (part.condition.trait === "Gender") {
            traitValue = metadata.gender;
        }
        else {
            traitValue = metadata.parts[part.condition.trait];
        }
        if (!traitValue) {
            return false;
        }
        return part.condition.values.includes(traitValue);
    }
    getDefaultParts(type, gender) {
        const traits = partsData[type][gender];
        const defaultParts = {};
        for (const trait of traits) {
            if (trait.parts.length > 0) {
                defaultParts[trait.name] = trait.parts[0].name;
            }
        }
        return defaultParts;
    }
}
export default new PartSelector();
//# sourceMappingURL=PartSelector.js.map