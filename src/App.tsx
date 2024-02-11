import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskList from "./components/TodoItems/TaskList";

function App() {
  return (
    <div>
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
