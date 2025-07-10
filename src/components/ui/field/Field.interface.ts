import type { CSSProperties, Dispatch, RefObject, SetStateAction } from "react";
import type { TooltipPositionType } from "../tooltip/Tooltip.interface";

export interface IField {
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  style?: CSSProperties;
  name: string;
  isHint?: boolean;
  type: string;
  placeholder?: string;
  ref?: RefObject<HTMLInputElement | null>;
  required?: boolean;
  error?: string | null;
  onChange?: Dispatch<SetStateAction<unknown>>;
  isOpenTooltip: boolean;
  top: number | null;
  tooltipPosition: TooltipPositionType;
}
