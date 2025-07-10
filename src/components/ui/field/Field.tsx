import type { ChangeEvent } from "react";
import type { IField } from "./Field.interface";
import styles from "./Field.module.css";
import { cn } from "../../../utils/cn";
import Tooltip from "../../ui/tooltip/Tooltip";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {
  EMPTY_LINE,
  INPUT_HINT_TEXT,
  TYPE_ERROR,
} from "../../../utils/constants";

const Field = ({
  className,
  setValue,
  value,
  style,
  name,
  placeholder,
  isHint,
  type,
  ref,
  required,
  error,
  onChange,
  isOpenTooltip,
  top,
  tooltipPosition,
}: IField) => {
  const { width } = useWindowDimensions();

  const handleField = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);

    if (onChange) {
      onChange(evt);
    }
  };

  return (
    <>
      <input
        ref={ref}
        type={type}
        className={cn(
          styles.field,
          className ? className : EMPTY_LINE,
          error ? styles.error : EMPTY_LINE
        )}
        placeholder={placeholder}
        name={name}
        onChange={handleField}
        value={value}
        style={{
          ...style,
          paddingRight: isHint ? (width >= 490 ? "12%" : "3%") : undefined,
        }}
        required={required}
      />
      {isHint && <span className={styles.hint}>{INPUT_HINT_TEXT}</span>}
      {error && (
        <Tooltip
          text={error}
          type={TYPE_ERROR}
          top={top && top + 15}
          position={tooltipPosition}
          isOpen={isOpenTooltip}
        />
      )}
    </>
  );
};

export default Field;
