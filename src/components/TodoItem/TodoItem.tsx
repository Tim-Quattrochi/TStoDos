import todoItemStyles from "./TodoItem.module.css";

type ItemProps = {
  id: number;
  task: string;
  complete: boolean | undefined;
};

const TodoItem = ({ id, task, complete }: ItemProps) => {
  return (
    <li className={todoItemStyles.container}>
      <div>{task}</div>
    </li>
  );
};

export default TodoItem;
