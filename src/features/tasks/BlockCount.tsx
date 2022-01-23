import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectTaskById, selectTasksBlockedBy } from "./tasksSlice";
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
