import { toDoItems } from "../utils/todos";

export const enum ActionTypes {
  EDIT = "edit",
  SAVE = "save",
  DELETE = "delete",
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
  REORDER = "reorder",
  REORDEREDCOMPLETE = "REORDEREDCOMPLETE",
  ADD = "add",
}

export const initialState: TodoStateType = {
  todoItems: toDoItems,
};

export type TodoItemType = {
  task: string;
  completed: boolean;
  inEdit?: boolean;
};

export type ReducerAction = {
  type: ActionTypes;
  payload?: string;

  index?: number;
};

export interface TodoStateType {
  todoItems: TodoItemType[];
}

export function todoReducer(
  state: TodoStateType,
  action: ReducerAction
): TodoStateType {
  switch (action.type) {
    case ActionTypes.EDIT:
      if (action.index !== undefined) {
        state.todoItems[action.index].inEdit = true;
      }

      return { ...state, todoItems: [...state.todoItems] };
    case ActionTypes.SAVE:
      console.log(action);
      if (action.index !== undefined && action.payload) {
        state.todoItems[action.index].inEdit = false;
        state.todoItems[action.index].task = action.payload;
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
    case ActionTypes.ADD: {
      const addedTask: TodoItemType = {
        task: "",
        completed: false,
        inEdit: true,
      };
      return {
        ...state,
        todoItems: [...state.todoItems, addedTask],
      };
    }
    case ActionTypes.REORDER: {
      if (action.index) {
        const items = [...state.todoItems];
        if (action.payload === "increase" && action.index > 0) {
          [items[action.index], items[action.index - 1]] = [
            items[action.index - 1],
            items[action.index],
          ];
        } else if (
          action.payload === "decrease" &&
          action.index < state.todoItems.length - 1
        ) {
          [items[action.index], items[action.index + 1]] = [
            items[action.index + 1],
            items[action.index],
          ];
        } else {
          return state;
        }

        return {
          ...state,
          todoItems: items,
        };
      }

      return {
        ...state,
        // todoItems: [...state.todoItems, addedTask],
      };
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}
