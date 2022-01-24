import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
  selectBlockersFor,
  selectTaskById,
  selectTasksBlockedBy,
} from "./tasksSlice";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiZzzFill } from "react-icons/ri";
import { formatRelative } from "date-fns";

export const BlockCount: FunctionComponent<{ taskId: string }> = ({
  taskId,
}) => {
  const blockedTasks = useSelector(selectTasksBlockedBy(taskId)).filter(
    (task) => !task.completed
  );

  return blockedTasks.length ? (
    <span>
      <MdOutlineWatchLater />
      {blockedTasks.length > 1
        ? `holding up ${blockedTasks.length} things`
        : `then: ${blockedTasks[0].message}`}
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
        : `after: ${blockers[0].message}`}
    </span>
  ) : null;
};

export const SnoozedIndicator: FunctionComponent<{
  taskId: string;
  now: Date;
}> = ({ taskId, now }) => {
  const task = useSelector(selectTaskById(taskId));
  if (task.snoozedUntil && new Date(task.snoozedUntil) > now)
    return (
      <span>
        <RiZzzFill />
        {`is snoozed until ${formatRelative(new Date(task.snoozedUntil), now)}`}
      </span>
    );
  else return null;
};
