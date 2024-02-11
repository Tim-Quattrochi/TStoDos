import { useState, useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import * as actions from "../../services/todoActions";
import { TodoContext } from "../../context/TodoContext";

export default function TaskList() {
  const [seeCompleted, setSeeCompleted] = useState<boolean>(false);

  const context = useContext(TodoContext);
  if (!context) {
    return null;
  }
  const { state, dispatch } = context;

  const {
    addTask,
    completeTask,
    editTask,
    saveTask,
    deCompleteTask,
  } = actions;
  console.log("state above list: ", state);

  const list = state.todoItems.map((v, i) => {
    if (!v.completed) {
      return (
        <TodoItem
          key={i}
          task={v.task}
          id={i}
          isEditing={v.inEdit}
          complete={v.completed}
          completeTask={() => completeTask(dispatch, i)}
          editTask={() => editTask(dispatch, i)}
          saveTask={(_, newTask) => saveTask(dispatch, i, newTask)}
        />
      );
    }
  });
  const completedList = state.todoItems.map((v, i) => {
    if (v.completed) {
      return (
        <div key={i}>
          <s>{v.task}</s>
          <button onClick={() => deCompleteTask(dispatch, i)}>
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
      <button onClick={() => addTask(dispatch)}>Add a Task</button>
    </>
  );
}
