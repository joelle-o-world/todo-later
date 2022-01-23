import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectTaskById, selectTasksBlockedBy } from "./tasksSlice";
import { MdOutlineWatchLater } from "react-icons/md";

export const BlockCount: FunctionComponent<{ taskId: string }> = ({
  taskId,
}) => {
  const blockedTasks = useSelector(selectTasksBlockedBy(taskId));
  const task = useSelector(selectTaskById(taskId));

  return blockedTasks.length ? (
    <span>
      <MdOutlineWatchLater />
      {`${task.completed ? "Blocked" : "Blocking"} ${blockedTasks.length} ${
        blockedTasks.length > 1 ? "tasks" : "task"
      }`}
    </span>
  ) : null;
};
