import React from "react";
import { TodoList } from "./features/counter/TodoList";
import "./App.css";
import { AddTask } from "./features/counter/AddTask";

export default function App() {
  return (
    <div>
      <h1>test</h1>
      <TodoList />
      <AddTask />
    </div>
  );
}
