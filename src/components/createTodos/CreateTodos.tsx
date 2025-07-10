import styles from "./CreateTodos.module.css";
import ArrowDownIcon from "../../assets/ArrowDownIcon.svg?react";
import type { ICreateTodos } from "./CreateTodos.interface";
import { useState, type ChangeEvent } from "react";
import { save } from "../../utils/storage";
import Field from "../ui/field/Field";
import { useValidation } from "../../hooks/useValidation";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { usePosition } from "../../hooks/usePosition";
import {
  EMPTY_LINE,
  INPUT_NAME_TASK,
  LOCALSTORAGE_KEY_ISACTIVE_TEXT,
  PLACEHOLDER_INPUT_CREATE,
  TOOLTIP_POSITION_FIXED,
  TYPE_BUTTON,
  TYPE_TEXT,
} from "../../utils/constants";

const CreateTodos = ({
  todos,
  setTodos,
  isActive,
  setIsActive,
}: ICreateTodos) => {
  const { width } = useWindowDimensions();
  const [value, setValue] = useState<string>(EMPTY_LINE);
  const { position, handleSubmit } = usePosition();
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);
  const { error, validate } = useValidation({
    required: true,
  });

  const todo = {
    id: Date.now(),
    task: value,
    isComplete: false,
  };

  const onClickArrow = () => {
    setIsActive(!isActive);
    save(LOCALSTORAGE_KEY_ISACTIVE_TEXT, !isActive);
  };

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validate(value)) {
      setValue(EMPTY_LINE);

      setTodos((prev) => [...prev, todo]);
    } else {
      setIsOpenTooltip(true);
      handleSubmit(evt);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {todos.length > 0 && (
        <button
          type={TYPE_BUTTON}
          className={styles.arrow}
          style={{
            transform: !isActive
              ? `rotate(180deg) translateY(${width >= 490 ? "50%" : "15%"})`
              : undefined,
          }}
          onClick={onClickArrow}
        >
          <ArrowDownIcon className={styles.icon} />
        </button>
      )}
      <Field
        className={styles.field}
        setValue={setValue}
        style={{
          paddingLeft: todos.length > 0 ? (width >= 490 ? "8%" : "3%") : "5%",
        }}
        value={value}
        name={INPUT_NAME_TASK}
        placeholder={PLACEHOLDER_INPUT_CREATE}
        type={TYPE_TEXT}
        isHint
        error={error}
        isOpenTooltip={isOpenTooltip}
        top={position && position?.y + 45}
        tooltipPosition={TOOLTIP_POSITION_FIXED}
      />
    </form>
  );
};

export default CreateTodos;
