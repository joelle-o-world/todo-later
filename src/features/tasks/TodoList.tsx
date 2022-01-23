import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTaskMessage,
  selectAllTasks,
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
import { BlockCount, BlockerCount } from "./BlockCount";
import { RootState } from "../../app/store";

export const TodoList: FunctionComponent<{
  selector?: (state: RootState) => Task[];
  title?: string;
  showAddTask?: boolean;
  hideIfEmpty?: boolean;
}> = ({
  selector = selectAllTasks,
  title,
  showAddTask = false,
  hideIfEmpty = false,
}) => {
  const tasks = useSelector(selector);
  if (hideIfEmpty && tasks.length === 0) return null;
  return (
    <div className="TodoList">
      {title && <h2>{title}</h2>}
      <ul>
        {tasks.map((task) => (
          <TaskView task={task} key={task.id} />
        ))}
      </ul>
      {showAddTask && <AddTask autoFocus />}
    </div>
  );
};

export const TaskView: FunctionComponent<{ task: Task; emojis?: boolean }> = ({
  task,
  emojis = true,
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
        {emojis && <AutoEmoji pattern={task.message} />}
      </div>
      <div className="TaskContent">
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
          <BlockerCount taskId={task.id} />
        </p>
      </div>
    </li>
  );
};
