import { ElementType, GenderType } from "./GodMetadata.js";
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

export interface ImageInfo {
  path: string;
  order: number;
}

interface PartCondition {
  trait: string;
  values: string[];
}

export interface Part {
  name: string;
  images?: ImageInfo[];
  percent?: number;
  condition?: PartCondition;
}

export interface Trait {
  name: string;
  parts: Part[];
}

const partsData: Record<ElementType, Record<GenderType, Trait[]>> = {
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
} as const;

export default partsData;
