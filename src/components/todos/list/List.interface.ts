import type { Dispatch, SetStateAction } from "react";
import type { ITodosItem } from "../item/Item.interface";

export interface ITodosList {
  data: ITodosItem[];
  setTodos: Dispatch<SetStateAction<ITodosItem[]>>;
  isActive: boolean;
}
