import type { Dispatch, SetStateAction } from "react";

export interface ITodosItemProps extends ITodosItem {
  setTodos: Dispatch<SetStateAction<ITodosItem[]>>;
}

export interface ITodosItem {
  id: number;
  task: string;
  isComplete: boolean;
}
