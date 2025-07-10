import type { ChangeEvent } from "react";
import type { ICheckbox } from "./Checkbox.interface";
import styles from "./Checkbox.module.css";
import { cn } from "../../utils/cn";
import {
  EMPTY_LINE,
  INPUT_NAME_TASK,
  TYPE_CHECKBOX,
} from "../../utils/constants";

const Checkbox = ({ isChecked, onChange, text }: ICheckbox) => {
  return (
    <label className={styles.label}>
      <input
        type={TYPE_CHECKBOX}
        name={INPUT_NAME_TASK}
        className={styles.input}
        checked={isChecked}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          onChange(evt.target.checked)
        }
      />
      <div
        className={cn(styles.checkbox, isChecked ? styles.active : EMPTY_LINE)}
      >
        <span className={styles.check}></span>
      </div>
      <span className={cn(styles.text, isChecked ? styles.active : EMPTY_LINE)}>
        {text}
      </span>
    </label>
  );
};

export default Checkbox;
