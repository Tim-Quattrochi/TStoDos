import { useState, useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import * as actions from "../../services/todoActions";
import { TodoContext } from "../../context/TodoContext";
import taskListStyles from "./taskList.module.css";
import Button from "../common/Button/Button";

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
    deleteTask,
  } = actions;

  const list = state.todoItems.map((v, i) => {
    if (!v.completed) {
      return (
        <TodoItem
          key={i}
          task={v.task}
          id={i}
          isEditing={v.inEdit}
          completeTask={() => completeTask(dispatch, i)}
          editTask={() => editTask(dispatch, i)}
          saveTask={(_, newTask) => saveTask(dispatch, i, newTask)}
          deleteTask={() => deleteTask(dispatch, i)}
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
            undo complete
          </button>
        </div>
      );
    }
  });
  return (
    <div className={taskListStyles.container}>
      <Button
        variant="info"
        onClick={() => setSeeCompleted(!seeCompleted)}
      >
        {seeCompleted
          ? "See Incomplete Tasks"
          : "See Completed Tasks"}
      </Button>
      {seeCompleted ? completedList : list}
      <Button
        hidden={seeCompleted}
        variant="secondary"
        onClick={() => addTask(dispatch)}
      >
        Add a Task
      </Button>
    </div>
  );
}
