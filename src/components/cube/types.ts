export type CubeDemoCommandType = "start" | "restart" | "randomize";

export interface CubeDemoCommand {
  id: number;
  type: CubeDemoCommandType;
}
