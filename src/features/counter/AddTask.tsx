import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./tasksSlice";

export const AddTask: FunctionComponent = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => dispatch(addTask(message))}>+</button>
    </div>
  );
};
