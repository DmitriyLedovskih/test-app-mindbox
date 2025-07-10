import {
  EMPTY_LINE,
  TOOLTIP_POSITION_ABSOLUTE,
  TOOLTIP_POSITION_FIXED,
} from "../../../utils/constants";
import type { ITooltip } from "./Tooltip.interface";
import styles from "./Tooltip.module.css";
import { cn } from "../../../utils/cn";

const Tooltip = ({
  text,
  type,
  className,
  isOpen,
  top,
  position,
}: ITooltip) => {
  return (
    <div
      className={cn(
        styles.tooltip,
        styles[type],
        className ? className : EMPTY_LINE,
        isOpen ? styles.open : EMPTY_LINE
      )}
      style={{
        top: top ? top : undefined,
        position:
          position === TOOLTIP_POSITION_FIXED
            ? TOOLTIP_POSITION_FIXED
            : TOOLTIP_POSITION_ABSOLUTE,
      }}
    >
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Tooltip;
