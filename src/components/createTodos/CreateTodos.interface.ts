import type { Dispatch, SetStateAction } from "react";
import type { ITodosItem } from "../todos/item/Item.interface";

export interface ICreateTodos {
  todos: ITodosItem[];
  setTodos: Dispatch<SetStateAction<ITodosItem[]>>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
