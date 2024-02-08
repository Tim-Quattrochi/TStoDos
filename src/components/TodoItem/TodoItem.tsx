import todoItemStyles from "./TodoItem.module.css";

interface TodoItemProps {
  id: number;
  task: string;
  complete: boolean;
  completeTask: (index: number) => void;
}

const TodoItem = ({ task, id, completeTask }: TodoItemProps) => {
  return (
    <li className={todoItemStyles.container}>
      <div>
        {task}
        <span>
          <button onClick={() => completeTask(id)}>
            mark complete
          </button>
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
