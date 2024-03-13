import { ChangeEvent, useState, DragEvent } from "react";
import Button from "../common/Button/Button";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  id: number;
  task: string;
  isEditing?: boolean;
  completed?: boolean;
  completeTask?: (index: number) => void;
  deComplete?: (index: number) => void;
  editTask?: (index: number) => void;
  saveTask?: (index: number, task: string) => void;
  deleteTask?: (index: number) => void;
  reOrderTask?: (index: number, direction: string) => void;
}

const TodoItem = ({
  id,
  task,
  isEditing,
  completed,
  completeTask,
  deComplete,
  editTask,
  saveTask,
  deleteTask,
  reOrderTask,
}: TodoItemProps) => {
  const [editedTask, setEditedTask] = useState<string>(task);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const isForDecomplete = !!deComplete;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text", String(id));
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const draggedItemId = Number(e.dataTransfer.getData("text"));

    reOrderTask?.(draggedItemId, "increase");
    setDragOver(false);
  };

  const handleUpdateTask = (): void => {
    if (isForDecomplete) {
      deComplete(id);
    } else {
      completeTask?.(id);
    }
  };

  return (
    <li
      className={`${styles.container} ${
        dragOver ? styles.dragOver : ""
      }`}
      draggable={!isEditing && !completed}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
    >
      {isEditing ? (
        <input
          className={styles.input}
          type="text"
          value={editedTask}
          onChange={handleChange}
        />
      ) : (
        <div className={styles.task}>
          {completed ? (
            <s>{task}</s>
          ) : (
            <p className={styles.draggable}>{task}</p>
          )}
        </div>
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
          onClick={() => saveTask?.(id, editedTask)}
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

      <Button variant="warning" onClick={() => deleteTask?.(id)}>
        {"Delete"}
      </Button>
    </li>
  );
};

export default TodoItem;
