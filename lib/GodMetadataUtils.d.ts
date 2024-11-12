import GodMetadata from "./GodMetadata.js";
import { OpenSeaMetadataAttribute } from "./OpenSeaMetadata.js";
declare class GodMetadataUtils {
    convertMetadataToAttributes(metadata: GodMetadata): OpenSeaMetadataAttribute[];
    convertAttributesToMetadata(attributes: OpenSeaMetadataAttribute[]): GodMetadata;
}
declare const _default: GodMetadataUtils;
export default _default;
//# sourceMappingURL=GodMetadataUtils.d.ts.map