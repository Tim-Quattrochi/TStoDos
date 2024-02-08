import { useState } from "react";
import todoItemStyles from "./TodoItem.module.css";

interface TodoItemProps {
  id: number;
  task: string;
  complete: boolean;
  isEditing: boolean | undefined;
  completeTask: (index: number) => void;
  editTask: (index: number) => void;
  saveTask: (index: number, task: string) => void;
}

const TodoItem = ({
  id,
  task,
  complete,
  isEditing,
  completeTask,
  editTask,
  saveTask,
}: TodoItemProps) => {
  const [editedTask, setEditedTask] = useState<string>(task);

  return (
    <li className={todoItemStyles.container}>
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <div className={todoItemStyles.task}>{task}</div>
      )}

      <button
        className={todoItemStyles.btn}
        onClick={() => completeTask(id)}
      >
        mark complete
      </button>

      {isEditing && (
        <button
          className={todoItemStyles.btn}
          onClick={() =>
            saveTask(
              id,
              document.getElementsByTagName("input")[0].value
            )
          }
        >
          save
        </button>
      )}
      <button
        className={todoItemStyles.btn}
        onClick={() => editTask(id)}
        hidden={isEditing}
      >
        edit
      </button>
    </li>
  );
};

export default TodoItem;
