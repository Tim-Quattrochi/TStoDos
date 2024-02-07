import TodoItem from "../components/TodoItem/TodoItem";
import { useReducer, useState } from "react";
import { toDoItems } from "../utils/todos";

const initialState: TodoStateType = {
  todoItems: toDoItems,
};

const enum ActionTypes {
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

type ReducerAction = {
  type: ActionTypes;
  payload?: {
    task?: string;
  };

  index?: number;
};

type TodoItemType = {
  task: string;
  completed: boolean;
  inEdit?: boolean;
};

type TodoStateType = {
  todoItems: TodoItemType[];
};

const newTask: TodoItemType = {
  task: "",
  completed: false,
};

function todoReducer(
  state: TodoStateType,
  action: ReducerAction
): TodoStateType {
  console.log(state);
  switch (action.type) {
    case ActionTypes.EDIT:
      if (action.index !== undefined) {
        state.todoItems[action.index].inEdit = true;
      }

      return { ...state };
    case ActionTypes.SAVE:
      if (action.index !== undefined) {
        state.todoItems[action.index].inEdit = false;
      }

      return { ...state };
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
      return {
        ...state,
        todoItems: [newTask, ...state.todoItems],
      };

    default:
      throw Error("Unknown action: " + action.type);
  }
}

export default function TaskList() {
  const [seeCompleted, setSeeCompleted] = useState<boolean>(false);

  const [state, dispatch] = useReducer(todoReducer, initialState);

  /** 
    function editTask
    parameter: index - index of toDo item in array

    dispatch type: 'edit'
  */
  const editTask = (index: number) => {
    dispatch({ type: ActionTypes.EDIT, index });
  };

  /** 
    function saveTask
    parameter: index - index of toDo item in array
    parameter: task - text of toDo item task

    dispatch type: 'save'
  */
  const saveTask = (index: number, task: string) => {
    dispatch({ type: ActionTypes.SAVE, index, payload: { task } });
  };

  /** 
    function completeTask
    parameter: index - index of toDo item in array

    dispatch type: 'complete'
  */
  const completeTask = (index: number) => {
    dispatch({ type: ActionTypes.COMPLETE, index });
  };

  /** 
    function deleteTask
    parameter: index - index of toDo item in array

    dispatch type: 'delete'
  */
  const deleteTask = (index: number) => {
    dispatch({ type: ActionTypes.DELETE, index });
  };

  /** 
    function addTask

    dispatch type: 'add'
  */
  const addTask = () => {
    dispatch({ type: ActionTypes.ADD });
  };

  /** 
    function reOrderTask
    parameter: index - index of toDo item in array
    parameter: direction - either 'increment' or 'decrement' signifies which direction to move a task

    dispatch type: 'add'
  */
  //   const reOrderTask = (index, direction) => {
  //     dispatch({
  //       type: ACTIONS.ADD,
  //       index,
  //       payload:
  //         direction !== ""
  //           ? direction === "increase"
  //             ? "increase"
  //             : "decrease"
  //           : "",
  //     });
  //   };

  /** 
    function completeTask
    parameter: index - index of toDo item in array

    dispatch type: 'complete'
  */
  const deCompleteTask = (index: number) => {
    dispatch({ type: ActionTypes.INCOMPLETE, index });
  };

  console.log("state above list: ", state);

  const list = state.todoItems.map((v, i) => {
    if (!v.completed) {
      return (
        <TodoItem
          key={i}
          task={v.task}
          id={i}
          complete={v.completed}
          completeTask={completeTask}
        />
      );
    }
  });
  const completedList = state.todoItems.map((v, i) => {
    if (v.completed) {
      return (
        <div key={i}>
          <s>{v.task}</s>
          <button onClick={() => deCompleteTask(i)}>
            uncomplete
          </button>
        </div>
      );
    }
  });
  return (
    <>
      <button onClick={() => setSeeCompleted(!seeCompleted)}>
        {seeCompleted
          ? "See Incomplete Tasks"
          : "See Completed Tasks"}
      </button>
      {seeCompleted ? completedList : list}
      <button onClick={addTask}>Add a Task</button>
    </>
  );
}
