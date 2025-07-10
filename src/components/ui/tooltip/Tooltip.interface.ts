export interface ITooltip {
  text: string;
  type: TooltipType;
  className?: string;
  isOpen: boolean;
  top?: number | null;
  position: TooltipPositionType;
}

export type TooltipType = "error" | "main";
export type TooltipPositionType = "fixed" | "absolute";
