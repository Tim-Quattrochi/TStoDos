import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import TaskList from "./components/TodoItems/TaskList";

function App() {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
}

export default App;
