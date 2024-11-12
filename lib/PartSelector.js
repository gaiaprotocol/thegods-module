import partsData from "./partsData.js";
class PartSelector {
    getTraits(type, gender) {
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
    getAvailablePartsForTrait(trait, metadata) {
        return trait.parts.filter((part) => this.isPartAvailable(part, metadata));
    }
    getSelectedParts(metadata) {
        const traits = this.getTraits(metadata.type, metadata.gender);
        const selectedParts = {};
        for (const trait of traits) {
            const availableParts = this.getAvailablePartsForTrait(trait, metadata);
            const selectedPartName = metadata.parts[trait.name];
            const selectedPart = availableParts.find((part) => part.name === selectedPartName);
            if (selectedPart)
                selectedParts[trait.name] = selectedPart;
        }
        return selectedParts;
    }
    getDefaultParts(type, gender) {
        const traits = this.getTraits(type, gender);
        const defaultParts = {};
        for (const trait of traits) {
            if (trait.parts.length > 0) {
                defaultParts[trait.name] = trait.parts[0].name;
            }
        }
        return defaultParts;
    }
    validateMetadata(metadata) {
        const errors = [];
        const traits = this.getTraits(metadata.type, metadata.gender);
        for (const trait of traits) {
            const availableParts = this.getAvailablePartsForTrait(trait, metadata);
            const selectedPartName = metadata.parts[trait.name];
            if (availableParts.length === 0) {
                if (selectedPartName) {
                    errors.push(`No parts are available for trait "${trait.name}", but a part "${selectedPartName}" is selected.`);
                }
                continue;
            }
            if (!selectedPartName) {
                errors.push(`Missing part for trait "${trait.name}".`);
                continue;
            }
            const part = availableParts.find((p) => p.name === selectedPartName);
            if (!part) {
                errors.push(`Invalid part "${selectedPartName}" selected for trait "${trait.name}".`);
                continue;
            }
        }
        return errors;
    }
}
export default new PartSelector();
//# sourceMappingURL=PartSelector.js.map