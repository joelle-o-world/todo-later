import React, {
  FunctionComponent,
  MutableRefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdOutlineArrowRightAlt,
  MdOutlineArrowRight,
  MdOutlineTimer,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addDependency,
  assignDependency,
  selectAllTasks,
  TaskId,
} from "./tasksSlice";
import Fuse from "fuse.js";

export const SnoozeBox: FunctionComponent<{
  taskId: string;
  onBlur: () => void;
}> = ({ taskId, onBlur }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const ref = useRef(null as null | HTMLInputElement);

  return (
    <div className="SnoozeBox">
      <MdOutlineTimer />
      <input
        className="SnoozeBoxMessage"
        autoFocus
        onBlur={() => setTimeout(onBlur, 100)}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        ref={ref}
        // TODO: Move this behaviour into a SelfResizingInput component
        style={{ width: `${20 + 7 * message.length}px` }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            dispatch(addDependency({ dependentTaskId: taskId, message }));
            ref.current?.blur();
          }
        }}
      />
      <MdOutlineArrowRightAlt />
      <Suggestions pattern={message} taskId={taskId} />
    </div>
  );
};

export const Suggestions: FunctionComponent<{
  pattern: string;
  taskId: TaskId;
}> = ({ pattern, taskId }) => {
  const allTasks = useSelector(selectAllTasks);
  const fuse = useMemo(
    () => new Fuse(allTasks, { keys: ["message"] }),
    [allTasks]
  );
  const suggestions = useMemo(
    () => fuse.search(pattern).filter((item) => item.item.id !== taskId),
    [taskId, fuse, pattern]
  );
  const dispatch = useDispatch();
  return (
    <div className="Suggestions">
      {suggestions.map(({ item }) => {
        return (
          <li
            key={item.id}
            onClick={() => {
              dispatch(
                assignDependency({
                  dependentTaskId: taskId,
                  dependencyTaskId: item.id,
                })
              );
            }}
          >
            {item.message}
          </li>
        );
      })}
    </div>
  );
};
