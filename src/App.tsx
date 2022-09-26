import React from "react";
import { TodoList } from "./features/tasks/TodoList";
import "./App.css";
import {
  selectActionableTasks,
  selectInactionablTasks,
} from "./features/tasks/tasksSlice";
import { ToggleEmojiMode } from "./features/settings/ToggleEmojiMode";
import useCurrentDate from "./features/tasks/useCurrentDate";

export default function App() {
  const now = useCurrentDate(15);
  return (
    <div>
      <TodoList selector={selectActionableTasks(now)} showAddTask />
      <TodoList
        title="Later"
        selector={selectInactionablTasks(now)}
        hideIfEmpty
      />
      <footer className="StickyBottom">
        <ToggleEmojiMode />
      </footer>
    </div>
  );
}
