import { Route, Routes } from "react-router-dom";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoItems from "./components/TodoItems/TodoItems";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <TodoItems />
    </div>
  );
}

export default App;
