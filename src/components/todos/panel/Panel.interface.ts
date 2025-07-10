import type { Dispatch, SetStateAction } from "react";
import type { ITodosItem } from "../item/Item.interface";

export type PanelType = "all" | "active" | "complete";

export interface IPanel {
  taskNumber: number;
  currentType: PanelType;
  setCurrentType: Dispatch<SetStateAction<PanelType>>;
  setTodos: Dispatch<SetStateAction<ITodosItem[]>>;
  todosComplete: ITodosItem[];
}
