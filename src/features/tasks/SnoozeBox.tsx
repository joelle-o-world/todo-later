import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdBlock,
  MdOutlineArrowRightAlt,
  MdOutlineTimer,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addDependency,
  assignDependency,
  selectAllTasks,
  snoozeTask,
  Task,
  TaskId,
} from "./tasksSlice";
import Fuse from "fuse.js";
import { timeSuggestions } from "./getTimeSuggestions";
import useCurrentDate from "./useCurrentDate";
import { PayloadAction } from "@reduxjs/toolkit";

export const SnoozeBox: FunctionComponent<{
  taskId: string;
  onBlur: () => void;
}> = ({ taskId, onBlur }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const ref = useRef(null as null | HTMLInputElement);
  const suggestions = useSuggestions({ taskId, pattern: message });
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (suggestions.length) {
          const action = acceptSuggestion(taskId, suggestions[0].item, now);
          console.log(now, action, suggestions[0]);
          dispatch(action);
        } else {
          dispatch(addDependency({ dependentTaskId: taskId, message }));
        }
        ref.current?.blur();
      }
    },
    [suggestions, taskId]
  );
  const now = useCurrentDate();

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
        onKeyPress={handleSubmit}
      />
      <MdOutlineArrowRightAlt />
      <Suggestions suggestions={suggestions} taskId={taskId} />
    </div>
  );
};

export type Suggestion =
  | { kind: "task"; task: Task }
  | {
      kind: "time";
      time: { label: string; dateFunction: (now: Date) => Date };
    };

const useSuggestions = ({
  taskId,
  pattern,
}: {
  taskId: TaskId;
  pattern: string;
}) => {
  const allTasks = useSelector(selectAllTasks);
  const fuse = useMemo(() => {
    const tasks = allTasks.map((task) => ({ kind: "task" as const, task }));
    return new Fuse<Suggestion>([...timeSuggestions, ...tasks], {
      keys: ["task.message", "time.label"],
    });
  }, [allTasks]);
  const suggestions = useMemo(
    () =>
      fuse
        .search(pattern)
        .filter(
          (result) =>
            result.item.kind !== "task" || result.item.task.id !== taskId
        ),
    [taskId, fuse, pattern]
  );
  return suggestions;
};

function acceptSuggestion(
  taskId: TaskId,
  suggestion: Suggestion,
  now: Date
): PayloadAction<any> {
  if (suggestion.kind === "task")
    return assignDependency({
      dependentTaskId: taskId,
      dependencyTaskId: suggestion.task.id,
    });
  else if (suggestion.kind === "time")
    return snoozeTask({
      taskId,
      until: suggestion.time.dateFunction(now).toString(),
    });
  // @ts-ignore
  else throw `Unexpected suggestion kind: ${suggestion.kind}`;
}

export const Suggestions: FunctionComponent<{
  suggestions: Fuse.FuseResult<Suggestion>[];
  taskId: TaskId;
}> = ({ suggestions, taskId }) => {
  const now = useCurrentDate();

  const dispatch = useDispatch();
  return (
    <div className="Suggestions">
      {suggestions.slice(0, 3).map(({ item }) => {
        if (item.kind === "task")
          return (
            <li
              key={item.task.id}
              onClick={() => {
                dispatch(
                  assignDependency({
                    dependentTaskId: taskId,
                    dependencyTaskId: item.task.id,
                  })
                );
              }}
            >
              <MdBlock />
              {item.task.message}
            </li>
          );
        else if (item.kind === "time")
          return (
            <li
              key={item.time.label}
              onClick={() =>
                dispatch(
                  snoozeTask({
                    taskId,
                    until: item.time.dateFunction(now).toString(),
                  })
                )
              }
            >
              <MdOutlineTimer />
              {item.time.label}
            </li>
          );
        else
          throw new TypeError(
            // @ts-ignore
            `Unexpected suggestion kind: ${item.kind}`
          );
      })}
    </div>
  );
};
