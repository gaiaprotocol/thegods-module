export type ElementType = "Stone" | "Fire" | "Water";
export type GenderType = "Man" | "Woman";

export default interface GodMetadata {
  type: ElementType;
  gender: GenderType;
  parts: { [trait: string]: string };
}
