import { ElementType, GenderType } from "./GodMetadata.js";
interface ImageInfo {
    path: string;
    order: number;
}
interface PartCondition {
    trait: string;
    values: string[];
}
interface PartData {
    name: string;
    images?: ImageInfo[];
    percent?: number;
    condition?: PartCondition;
}
interface PartCategory {
    name: string;
    parts: PartData[];
}
declare const partsData: Record<ElementType, Record<GenderType, PartCategory[]>>;
export default partsData;
//# sourceMappingURL=partsData.d.ts.map