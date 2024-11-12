import { ElementType, GenderType } from "./GodMetadata.js";
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
declare const partsData: Record<ElementType, Record<GenderType, Trait[]>>;
export default partsData;
//# sourceMappingURL=partsData.d.ts.map