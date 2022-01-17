import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTasks,
  selectUnblockedTasks,
  Task,
  toggleTask,
} from "./tasksSlice";
import classNames from "classnames";
import "./TodoList.sass";
import { AddTask } from "./AddTask";

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

export const TaskView: FunctionComponent<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li className={classNames("TaskView", { completed: task.completed })}>
      <input
        type="checkbox"
        className="TaskViewTickbox"
        checked={task.completed}
        onClick={() => dispatch(toggleTask(task.id))}
      />
      <input className="TaskViewMessage" type="text" value={task.message} />
      <button>Zz</button>
    </li>
  );
};
