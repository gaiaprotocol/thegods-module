export type PartType = "Stone" | "Fire" | "Water";
export type GenderType = "Man" | "Woman";

export default interface GodMetadata {
  type: PartType;
  gender: GenderType;
  parts: Record<string, string>;
}
