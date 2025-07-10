import { cn } from "../../../utils/cn";
import {
  BUTTON_CLEAR_TEXT,
  EMPTY_LINE,
  NOT_TASK_TEXT,
  PANEL_TYPE,
  PANEL_TYPE_TEXT,
  TASK_NUMBER,
  TYPE_BUTTON,
} from "../../../utils/constants";
import type { ITodosItem } from "../item/Item.interface";
import type { IPanel, PanelType } from "./Panel.interface";
import styles from "./Panel.module.css";

const buttons = [
  {
    id: 1,
    text: PANEL_TYPE_TEXT.all,
    type: PANEL_TYPE.all,
  },
  {
    id: 2,
    text: PANEL_TYPE_TEXT.active,
    type: PANEL_TYPE.active,
  },
  {
    id: 3,
    text: PANEL_TYPE_TEXT.complete,
    type: PANEL_TYPE.complete,
  },
];

const TodosPanel = ({
  taskNumber,
  currentType,
  setCurrentType,
  setTodos,
  todosComplete,
}: IPanel) => {
  const clearCompleteItem = () => {
    setTodos((prev: ITodosItem[]) => {
      const filter = prev.filter((item) => !item.isComplete);
      return filter;
    });
  };

  return (
    <div className={styles.panel}>
      <span className={styles.text}>
        {taskNumber > 0 ? TASK_NUMBER(taskNumber) : NOT_TASK_TEXT}
      </span>
      <ul className={styles.buttons}>
        {buttons.length &&
          buttons.map((button) => (
            <li key={button.id}>
              <button
                type={TYPE_BUTTON}
                className={cn(
                  styles.button,
                  button.type === currentType ? styles.active : EMPTY_LINE
                )}
                onClick={() => setCurrentType(button.type as PanelType)}
              >
                {button.text}
              </button>
            </li>
          ))}
      </ul>
      {todosComplete.length > 0 ? (
        <button
          className={cn(styles.clear, styles.button)}
          onClick={clearCompleteItem}
        >
          {BUTTON_CLEAR_TEXT}
        </button>
      ) : null}
    </div>
  );
};

export default TodosPanel;
