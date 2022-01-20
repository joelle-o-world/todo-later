import React, { FunctionComponent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AutoEmoji } from "./AutoEmoji";
import { addTask } from "./tasksSlice";

export const AddTask: FunctionComponent<{
  autoFocus?: boolean;
  emojis?: boolean;
}> = ({ autoFocus = false, emojis = false }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="AddTask">
      {emojis && <AutoEmoji search={message} />}
      <input
        className="AddTaskMessage"
        placeholder="+ Add a new task"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoFocus={autoFocus}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && message.trim()) {
            dispatch(addTask(message));
            setMessage("");
          }
        }}
      />
    </div>
  );
};
