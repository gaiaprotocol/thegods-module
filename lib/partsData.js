import fireManParts from "./parts-jsons/fire-man-parts.json" with {
    type: "json"
};
import fireWomanParts from "./parts-jsons/fire-woman-parts.json" with {
    type: "json"
};
import stoneManParts from "./parts-jsons/stone-man-parts.json" with {
    type: "json"
};
import stoneWomanParts from "./parts-jsons/stone-woman-parts.json" with {
    type: "json"
};
import waterManParts from "./parts-jsons/water-man-parts.json" with {
    type: "json"
};
import waterWomanParts from "./parts-jsons/water-woman-parts.json" with {
    type: "json"
};
const partsData = {
    Stone: {
        Man: stoneManParts,
        Woman: stoneWomanParts,
    },
    Fire: {
        Man: fireManParts,
        Woman: fireWomanParts,
    },
    Water: {
        Man: waterManParts,
        Woman: waterWomanParts,
    },
};
export default partsData;
//# sourceMappingURL=partsData.js.map