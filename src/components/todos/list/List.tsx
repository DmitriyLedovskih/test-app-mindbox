import NotFound from "../../notFound/NotFound";
import TodosItem from "../item/Item";
import type { ITodosList } from "./List.interface";
import styles from "./List.module.css";
import { NOT_FOUND_TEXT } from "../../../utils/constants";

const TodosList = ({ data, setTodos, isActive }: ITodosList) => {
  return (
    <div
      style={{
        maxHeight: isActive ? 465 : 0,
      }}
      className={styles.block}
    >
      {data && data.length ? (
        <ul className={styles.list}>
          {data.map((item) => (
            <TodosItem key={item.id} setTodos={setTodos} {...item} />
          ))}
        </ul>
      ) : (
        <NotFound text={NOT_FOUND_TEXT} />
      )}
    </div>
  );
};

export default TodosList;
