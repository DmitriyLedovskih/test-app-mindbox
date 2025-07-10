import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import Checkbox from "../../checkbox/Checkbox";
import type { ITodosItem, ITodosItemProps } from "./Item.interface";
import styles from "./Item.module.css";
import { cn } from "../../../utils/cn";
import DeleteIcon from "../../../assets/DeleteIcon.svg?react";
import EditIcon from "../../../assets/EditIcon.svg?react";
import CloseIcon from "../../../assets/CloseIcon.svg?react";
import Field from "../../ui/field/Field";
import { useValidation } from "../../../hooks/useValidation";
import Tooltip from "../../ui/tooltip/Tooltip";
import {
  EMPTY_LINE,
  INPUT_NAME_EDIT,
  TOOLTIP_POSITION_FIXED,
  TYPE_BUTTON,
  TYPE_MAIN,
  TYPE_TEXT,
} from "../../../utils/constants";
import { usePosition } from "../../../hooks/usePosition";

const TodosItem = ({ id, task, isComplete, setTodos }: ITodosItemProps) => {
  const [isCheck, setIsCheck] = useState<boolean>(isComplete);
  const [isVisibleForm, setIsVisibleForm] = useState<boolean>(false);
  const [isOpenTooltipError, setIsOpenTooltipError] = useState<boolean>(false);
  const [value, setValue] = useState<string>(task);
  const fieldRef = useRef<HTMLInputElement>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const { position, handleMouseEnter, handleTouch } = usePosition();
  const { validate, error } = useValidation({
    required: true,
  });

  const todo = {
    id,
    task,
    isComplete,
  };
  const openTooltipHover = (evt: MouseEvent<HTMLButtonElement>) => {
    setIsTooltipOpen(true);
    handleMouseEnter(evt);
  };

  const openTooltipTouch = (evt: TouchEvent<HTMLButtonElement>) => {
    setIsTooltipOpen(true);
    handleTouch(evt);
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
  };

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validate(value)) {
      setTodos((prev: ITodosItem[]) =>
        prev.map((item) => (item.id === id ? { ...todo, task: value } : item))
      );

      setIsVisibleForm(false);
    } else {
      setIsOpenTooltipError(true);
    }
  };

  const deleteItem = () =>
    setTodos((prev: ITodosItem[]) => prev.filter((item) => item.id !== id));

  const handleCheckbox = (check: boolean) => {
    setIsCheck(check);

    setTodos((prev: ITodosItem[]) =>
      prev.map((item) =>
        item.id === id ? { ...todo, isComplete: check } : item
      )
    );
  };

  const onClickEdit = () => {
    setIsVisibleForm(!isVisibleForm);
  };

  useEffect(() => {
    if (isVisibleForm && fieldRef.current) {
      fieldRef.current.focus();
    }
  }, [isVisibleForm]);

  return (
    <li
      className={styles.item}
      style={{
        padding: isVisibleForm ? "5px 10px" : undefined,
      }}
    >
      {!isVisibleForm ? (
        <>
          <button
            className={cn(styles.button, isCheck ? styles.check : EMPTY_LINE)}
            onMouseEnter={openTooltipHover}
            onMouseLeave={closeTooltip}
            onTouchStart={openTooltipTouch}
            onTouchEnd={closeTooltip}
          >
            <Checkbox
              isChecked={isCheck}
              onChange={handleCheckbox}
              text={task}
            />
          </button>
          <ul className={styles.controls}>
            <li>
              <button
                type={TYPE_BUTTON}
                className={styles.control}
                onClick={onClickEdit}
              >
                <EditIcon className={styles.icon} />
              </button>
            </li>
            <li>
              <button
                type={TYPE_BUTTON}
                className={styles.control}
                onClick={deleteItem}
              >
                <DeleteIcon className={styles.icon} />
              </button>
            </li>
          </ul>
          {task && task.length >= 45 && (
            <Tooltip
              type={TYPE_MAIN}
              text={task}
              isOpen={isTooltipOpen}
              top={position && position?.y + 55}
              position={TOOLTIP_POSITION_FIXED}
            />
          )}
        </>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <button
            type={TYPE_BUTTON}
            className={styles.close}
            onClick={() => setIsVisibleForm(false)}
          >
            <CloseIcon className={styles.icon} />
          </button>
          <Field
            name={INPUT_NAME_EDIT}
            type={TYPE_TEXT}
            className={styles.field}
            value={value}
            setValue={setValue}
            isHint
            required
            ref={fieldRef}
            error={error}
            top={position && position?.y + 35}
            tooltipPosition={TOOLTIP_POSITION_FIXED}
            isOpenTooltip={isOpenTooltipError}
          />
        </form>
      )}
    </li>
  );
};

export default TodosItem;
