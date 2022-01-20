import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTaskMessage,
  selectAllTasks,
  selectUnblockedTasks,
  Task,
  toggleTask,
} from "./tasksSlice";
import classNames from "classnames";
import "./TodoList.sass";
import { AddTask } from "./AddTask";
import { AutoEmoji } from "./AutoEmoji";

export const TodoList: FunctionComponent = () => {
  const unblockedTasks = useSelector(selectAllTasks);
  return (
    <div className="TodoList">
      <ul>
        {unblockedTasks.map((task) => (
          <TaskView task={task} />
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
  return (
    <li className={classNames("TaskView", { completed: task.completed })}>
      <input
        type="checkbox"
        className="TaskViewTickbox"
        checked={task.completed}
        onClick={() => dispatch(toggleTask(task.id))}
      />
      {emojis && <AutoEmoji search={task.message} />}
      <input
        className="TaskViewMessage"
        type="text"
        value={task.message}
        readOnly={task.completed}
        onChange={(e) =>
          dispatch(
            editTaskMessage({ taskId: task.id, message: e.target.value })
          )
        }
      />
    </li>
  );
};
