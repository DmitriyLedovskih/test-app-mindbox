import { useEffect, useMemo, useState } from "react";
import TodosList from "./list/List";
import TodosPanel from "./panel/Panel";
import styles from "./Todos.module.css";
import type { ITodosItem } from "./item/Item.interface";
import { load, save } from "../../utils/storage";
import type { PanelType } from "./panel/Panel.interface";
import CreateTodos from "../createTodos/CreateTodos";
import {
  LOCALSTORAGE_KEY_ISACTIVE_TEXT,
  LOCALSTORAGE_KEY_TODOS_TEXT,
  MAIN_TITLE_TEXT,
  PANEL_TYPE,
} from "../../utils/constants";

const initialData: ITodosItem[] = [];

const Todos = () => {
  const [currentType, setCurrentType] = useState<PanelType>(
    PANEL_TYPE.all as PanelType
  );
  const [isActive, setIsActive] = useState<boolean>(() => {
    const savedIsActive = load(LOCALSTORAGE_KEY_ISACTIVE_TEXT);
    return savedIsActive ? savedIsActive : false;
  });
  const [todos, setTodos] = useState<ITodosItem[]>(() => {
    const savedTodos = load(LOCALSTORAGE_KEY_TODOS_TEXT);
    return savedTodos.length > 0 ? savedTodos : initialData;
  });

  const todosNotComplete = useMemo(
    () => todos.filter((item) => !item.isComplete),
    [todos]
  );

  const todosComplete = useMemo(
    () => todos.filter((item) => item.isComplete),
    [todos]
  );

  const filterData = useMemo(() => {
    switch (currentType) {
      case PANEL_TYPE.active:
        return todosNotComplete;
      case PANEL_TYPE.complete:
        return todosComplete;
      default:
        return todos;
    }
  }, [currentType, todos, todosComplete, todosNotComplete]);

  useEffect(() => {
    save(LOCALSTORAGE_KEY_TODOS_TEXT, todos);
  }, [todos]);

  return (
    <div className={styles.todos}>
      <h1 className={styles.title}>{MAIN_TITLE_TEXT}</h1>
      <div className={styles.block}>
        <CreateTodos
          todos={todos}
          setTodos={setTodos}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <TodosList data={filterData} setTodos={setTodos} isActive={isActive} />
        <TodosPanel
          taskNumber={todosNotComplete.length}
          currentType={currentType}
          setCurrentType={setCurrentType}
          setTodos={setTodos}
          todosComplete={todosComplete}
        />
      </div>
    </div>
  );
};

export default Todos;
