import React from "react";
import { TodoList } from "./features/tasks/TodoList";
import "./App.css";
import {
  selectBlockedTasks,
  selectUnblockedTasks,
} from "./features/tasks/tasksSlice";

export default function App() {
  return (
    <div>
      <TodoList title="Now" selector={selectUnblockedTasks} showAddTask />
      <TodoList title="Later" selector={selectBlockedTasks} hideIfEmpty />
    </div>
  );
}
