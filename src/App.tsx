import { Route, Routes } from "react-router-dom";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoItems from "./components/TodoItems/TodoItems";
import Header from "./components/Header/Header";
import ContactList from "./context/TodoContext";

function App() {
  return (
    <div>
      <Header />
      <ContactList />
    </div>
  );
}

export default App;
