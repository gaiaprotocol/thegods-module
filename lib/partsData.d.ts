import { GenderType, PartType } from "./GodMetadata.js";
export interface ImageInfo {
    path: string;
    order: number;
}
interface PartCondition {
    trait: string;
    values: string[];
}
export interface PartItem {
    name: string;
    images?: ImageInfo[];
    percent?: number;
    condition?: PartCondition;
}
export interface PartCategory {
    name: string;
    parts: PartItem[];
}
declare const partsData: Record<PartType, Record<GenderType, PartCategory[]>>;
export default partsData;
//# sourceMappingURL=partsData.d.ts.map