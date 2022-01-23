import React from "react";
import { TodoList } from "./features/tasks/TodoList";
import "./App.css";
import {
  selectBlockedTasks,
  selectUnblockedTasks,
} from "./features/tasks/tasksSlice";
import { ToggleEmojiMode } from "./features/settings/ToggleEmojiMode";

export default function App() {
  return (
    <div>
      <TodoList selector={selectUnblockedTasks} showAddTask />
      <TodoList title="Later" selector={selectBlockedTasks} hideIfEmpty />
      <footer className="StickyBottom">
        <ToggleEmojiMode />
      </footer>
    </div>
  );
}
