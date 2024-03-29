import { Dispatch } from "react";
import { ActionTypes, ReducerAction } from "../reducers/todoReducer";

type TodoDispatch = Dispatch<ReducerAction>;

export const editTask = (dispatch: TodoDispatch, index: number) => {
  dispatch({ type: ActionTypes.EDIT, index });
};

export const saveTask = (
  dispatch: TodoDispatch,
  index: number,
  task: string
) => {
  dispatch({ type: ActionTypes.SAVE, index, payload: task });
};

export const completeTask = (
  dispatch: TodoDispatch,
  index: number
) => {
  dispatch({ type: ActionTypes.COMPLETE, index });
};

export const deleteTask = (dispatch: TodoDispatch, index: number) => {
  dispatch({ type: ActionTypes.DELETE, index });
};

export const addTask = (dispatch: TodoDispatch) => {
  dispatch({ type: ActionTypes.ADD });
};

/** 
    function reOrderTask
    parameter: index - index of toDo item in array
    parameter: direction - either 'increment' or 'decrement' signifies which direction to move a task

    dispatch type: 'add'
  */
export const reOrderTask = (
  dispatch: TodoDispatch,
  index: number,
  direction: string
) => {
  dispatch({
    type: ActionTypes.REORDER,
    index,
    payload:
      direction !== ""
        ? direction === "increase"
          ? "increase"
          : "decrease"
        : "",
  });
};

export const deCompleteTask = (
  dispatch: TodoDispatch,
  index: number
) => {
  dispatch({ type: ActionTypes.INCOMPLETE, index });
};
