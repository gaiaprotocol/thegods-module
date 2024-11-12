import partsData from "./partsData.js";
class PartsManager {
    getPartCategory(type, gender) {
        return partsData[type][gender];
    }
    getDefaultParts(type, gender) {
        const category = this.getPartCategory(type, gender);
        const defaultParts = {};
        category.forEach((trait) => {
            if (trait.parts.length > 0) {
                defaultParts[trait.name] = trait.parts[0].name;
            }
        });
        return defaultParts;
    }
    isPartAvailable(part, currentParts) {
        if (!part.condition)
            return true;
        return part.condition.values.includes(currentParts[part.condition.trait]);
    }
    getAvailableParts(type, gender, currentParts) {
        const category = this.getPartCategory(type, gender);
        const imageParts = [];
        category.forEach((trait, traitId) => {
            trait.parts.forEach((part, partId) => {
                if (this.isPartAvailable(part, currentParts) &&
                    currentParts[trait.name] === part.name) {
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
    validatePartCombination(type, gender, parts) {
        const availableParts = this.getAvailableParts(type, gender, parts);
        const requiredPartNames = new Set(this.getPartCategory(type, gender)
            .filter((trait) => !trait.parts.some((part) => part.name === "None"))
            .map((trait) => trait.name));
        const selectedPartNames = new Set(availableParts.map((part) => this.getPartCategory(type, gender)[part.traitId].name));
        return [...requiredPartNames].every((name) => selectedPartNames.has(name));
    }
    getAvailablePartsForTrait(type, gender, traitName, currentParts) {
        const category = this.getPartCategory(type, gender);
        const trait = category.find((t) => t.name === traitName);
        if (!trait)
            return [];
        return trait.parts.filter((part) => this.isPartAvailable(part, currentParts));
    }
}
export default new PartsManager();
//# sourceMappingURL=PartsManager.js.map