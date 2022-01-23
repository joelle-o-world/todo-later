import React, {
  FunctionComponent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { MdOutlineArrowRightAlt, MdOutlineArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addDependency } from "./tasksSlice";

export const SnoozeBox: FunctionComponent<{
  taskId: string;
  onBlur: () => void;
}> = ({ taskId, onBlur }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const ref = useRef(null as null | HTMLInputElement);

  return (
    <div className="SnoozeBox">
      <MdOutlineArrowRight />
      <input
        className="SnoozeBoxMessage"
        autoFocus
        onBlur={onBlur}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        ref={ref}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            dispatch(addDependency({ dependentTaskId: taskId, message }));
            ref.current?.blur();
          }
        }}
      />
      <MdOutlineArrowRightAlt />
    </div>
  );
};
