import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
  selectBlockersFor,
  selectTaskById,
  selectTasksBlockedBy,
} from "./tasksSlice";
import { MdOutlineWatchLater } from "react-icons/md";

export const BlockCount: FunctionComponent<{ taskId: string }> = ({
  taskId,
}) => {
  const blockedTasks = useSelector(selectTasksBlockedBy(taskId)).filter(
    (task) => !task.completed
  );
  const task = useSelector(selectTaskById(taskId));

  return blockedTasks.length ? (
    <span>
      <MdOutlineWatchLater />
      {`${task.completed ? "Held up" : "Holding up"} ${blockedTasks.length} ${
        blockedTasks.length > 1 ? "things" : "thing"
      }`}
    </span>
  ) : null;
};

export const BlockerCount: FunctionComponent<{ taskId: string }> = ({
  taskId,
}) => {
  const blockers = useSelector(selectBlockersFor(taskId)).filter(
    (task) => !task.completed
  );
  return blockers.length ? (
    <span>
      <MdOutlineWatchLater />
      {blockers.length > 1
        ? `held up by ${blockers.length} things`
        : `after ${blockers[0].message}`}
    </span>
  ) : null;
};
