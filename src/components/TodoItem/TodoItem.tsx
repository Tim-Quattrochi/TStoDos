import { ChangeEvent, useState } from "react";
import Button from "../common/Button/Button";
import todoItemStyles from "./TodoItem.module.css";

interface TodoItemProps {
  id: number;
  task: string;
  isEditing?: boolean;
  completeTask?: (index: number) => void;
  deComplete?: (index: number) => void;
  editTask?: (index: number) => void;
  saveTask?: (index: number, task: string) => void;
  deleteTask?: (index: number) => void;
}

const TodoItem = ({
  id,
  task,
  isEditing,
  completeTask,
  deComplete,
  editTask,
  saveTask,
  deleteTask,
}: TodoItemProps) => {
  const [editedTask, setEditedTask] = useState<string>(task);

  const isForDecomplete = !!deComplete;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  const handleUpdateTask = (): void => {
    if (isForDecomplete) {
      deComplete(id);
    } else {
      completeTask?.(id);
    }
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

      {deComplete ? (
        <Button variant="success" onClick={handleUpdateTask}>
          undo complete
        </Button>
      ) : (
        <Button variant="success" onClick={handleUpdateTask}>
          complete
        </Button>
      )}

      {isEditing ? (
        <Button
          variant="primary"
          onClick={() => saveTask?.(id, task)}
        >
          Save
        </Button>
      ) : (
        <Button
          hidden={isForDecomplete}
          variant="secondary"
          onClick={() => editTask?.(id)}
        >
          {"Edit"}
        </Button>
      )}

      {}
      <Button variant="warning" onClick={() => deleteTask?.(id)}>
        {"Delete"}
      </Button>
    </li>
  );
};

export default TodoItem;
