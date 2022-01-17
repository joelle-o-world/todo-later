import { FunctionComponent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./tasksSlice";

export const AddTask: FunctionComponent<{ autoFocus?: boolean }> = ({
  autoFocus,
}) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  return (
    <input
      className="AddTask"
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
  );
};
