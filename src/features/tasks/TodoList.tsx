import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTaskMessage,
  selectUnblockedTasks,
  setTaskCompleted,
  Task,
  toggleTask,
} from "./tasksSlice";
import classNames from "classnames";
import "./TodoList.sass";
import { AddTask } from "./AddTask";
import { AutoEmoji } from "./AutoEmoji";
import { SnoozeBox } from "./SnoozeBox";
import { MdOutlineWatchLater } from "react-icons/md";
import { BlockCount } from "./BlockCount";

export const TodoList: FunctionComponent = () => {
  const unblockedTasks = useSelector(selectUnblockedTasks);
  return (
    <div className="TodoList">
      <ul>
        {unblockedTasks.map((task) => (
          <TaskView task={task} key={task.id} />
        ))}
      </ul>
      <AddTask autoFocus />
    </div>
  );
};

export const TaskView: FunctionComponent<{ task: Task; emojis?: boolean }> = ({
  task,
  emojis = false,
}) => {
  const dispatch = useDispatch();
  const [snoozeBoxVisible, setSnoozeBoxVisible] = useState(false);

  return (
    <li className={classNames("TaskView", { completed: task.completed })}>
      <div className="TaskMargin">
        {snoozeBoxVisible ? (
          <SnoozeBox
            onBlur={() => setSnoozeBoxVisible(false)}
            taskId={task.id}
          />
        ) : (
          <button className="snooze" onClick={() => setSnoozeBoxVisible(true)}>
            <MdOutlineWatchLater />
          </button>
        )}
        {!snoozeBoxVisible && (
          <input
            type="checkbox"
            className="TaskViewTickbox"
            checked={task.completed}
            onChange={(e) =>
              dispatch(
                setTaskCompleted({
                  taskId: task.id,
                  completed: e.target.checked,
                })
              )
            }
          />
        )}
      </div>
      <div className="TaskContent">
        {emojis && <AutoEmoji search={task.message} />}
        <input
          className="TaskViewMessage"
          type="text"
          value={task.message}
          readOnly={task.completed || snoozeBoxVisible}
          onChange={(e) =>
            dispatch(
              editTaskMessage({ taskId: task.id, message: e.target.value })
            )
          }
        />
        <p className="stats">
          <BlockCount taskId={task.id} />
        </p>
      </div>
    </li>
  );
};
