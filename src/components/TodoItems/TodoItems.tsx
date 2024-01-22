import TodoItem from "../TodoItem/TodoItem";
import todoItemStyles from "./todoItems.module.css";

const todos = [
  { id: 1, task: "Buy groceries", completed: false },
  { id: 2, task: "Read a book", completed: false },
  { id: 3, task: "Exercise", completed: false },
  { id: 4, task: "Finish coding project", completed: false },
];

const TodoItems = () => {
  return (
    <main>
      <h1 className={todoItemStyles.title}>My List</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            task={todo.task}
            complete={todo.completed}
          />
        ))}
      </ul>
    </main>
  );
};

export default TodoItems;
