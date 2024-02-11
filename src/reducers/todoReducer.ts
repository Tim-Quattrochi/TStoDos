import { toDoItems } from "../utils/todos";

export const enum ActionTypes {
  EDIT = "edit",
  SAVE = "save",
  DELETE = "delete",
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
  UPDATE = "update",
  REORDER = "reorder",
  REORDEREDCOMPLETE = "REORDEREDCOMPLETE",
  ADD = "add",
}

export const initialState: TodoStateType = {
  todoItems: toDoItems,
};

type TodoItemType = {
  task: string;
  completed: boolean;
  inEdit?: boolean;
};

export type ReducerAction = {
  type: ActionTypes;
  payload?: {
    task: string;
  };

  index?: number;
};

export interface TodoStateType {
  todoItems: TodoItemType[];
}

const newTask: TodoItemType = {
  task: "",
  completed: false,
};

export function todoReducer(
  state: TodoStateType,
  action: ReducerAction
): TodoStateType {
  console.log(state);
  switch (action.type) {
    case ActionTypes.EDIT:
      if (action.index !== undefined) {
        state.todoItems[action.index].inEdit = true;
      }

      return { ...state, todoItems: [...state.todoItems] };
    case ActionTypes.SAVE:
      if (action.index !== undefined && action.payload) {
        state.todoItems[action.index].inEdit = false;
        state.todoItems[action.index].task = action.payload.task;
      }

      return { ...state, todoItems: [...state.todoItems] };
    case ActionTypes.DELETE: {
      return {
        ...state,
        todoItems: state.todoItems.filter(
          (_, i) => i !== action.index
        ),
      };
    }
    case ActionTypes.COMPLETE:
      if (action.index !== undefined) {
        state.todoItems[action.index].completed = true;
      }

      return { ...state };
    case ActionTypes.INCOMPLETE:
      if (action.index !== undefined) {
        state.todoItems[action.index].completed = false;
      }

      return { ...state };
    case ActionTypes.ADD:
      newTask.inEdit = true;
      return {
        ...state,
        todoItems: [newTask, ...state.todoItems],
      };

    default:
      throw Error("Unknown action: " + action.type);
  }
}
