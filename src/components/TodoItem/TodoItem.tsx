import { ChangeEvent, useState } from "react";
import Button from "../common/Button/Button";
import todoItemStyles from "./TodoItem.module.css";

interface TodoItemProps {
  id: number;
  task: string;
  isEditing: boolean | undefined;
  completeTask: (index: number) => void;
  editTask: (index: number) => void;
  saveTask: (index: number, task: string) => void;
  deleteTask: (index: number) => void;
}

const TodoItem = ({
  id,
  task,
  isEditing,
  completeTask,
  editTask,
  saveTask,
  deleteTask,
}: TodoItemProps) => {
  const [editedTask, setEditedTask] = useState<string>(task);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  const handleUpdateTask = (id: number) => {
    saveTask(id, editedTask);
  };

  return (
    <li className={todoItemStyles.container}>
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={handleChange}
        />
      ) : (
        <div className={todoItemStyles.task}>{task}</div>
      )}

      <Button variant="success" onClick={() => completeTask(id)}>
        mark complete
      </Button>

      {isEditing ? (
        <Button
          variant="primary"
          onClick={() => handleUpdateTask(id)}
        >
          Save
        </Button>
      ) : (
        <Button variant="secondary" onClick={() => editTask(id)}>
          {"Edit"}
        </Button>
      )}
      <Button variant="warning" onClick={() => deleteTask(id)}>
        {"Delete"}
      </Button>
    </li>
  );
};

export default TodoItem;
