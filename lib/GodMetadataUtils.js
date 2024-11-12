class GodMetadataUtils {
    convertMetadataToAttributes(metadata) {
        return [
            {
                trait_type: "Type",
                value: metadata.type,
            },
            {
                trait_type: "Gender",
                value: metadata.gender,
            },
            ...Object.entries(metadata.parts).map(([key, value]) => ({
                trait_type: key,
                value,
            })),
        ];
    }
    convertAttributesToMetadata(attributes) {
        const metadata = {
            type: attributes.find((a) => a.trait_type === "Type").value,
            gender: attributes.find((a) => a.trait_type === "Gender")
                .value,
            parts: Object.fromEntries(attributes
                .filter((a) => a.trait_type !== "Type" && a.trait_type !== "Gender")
                .map((a) => [a.trait_type, a.value])),
        };
        return metadata;
    }
}
export default new GodMetadataUtils();
//# sourceMappingURL=GodMetadataUtils.js.map