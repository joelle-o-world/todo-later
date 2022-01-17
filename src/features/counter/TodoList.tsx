import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTasks,
  selectUnblockedTasks,
  Task,
  toggleTask,
} from "./tasksSlice";

export const TodoList: FunctionComponent = () => {
  const unblockedTasks = useSelector(selectAllTasks);
  return (
    <ul>
      {unblockedTasks.map((task) => (
        <TaskView task={task} />
      ))}
    </ul>
  );
};

export const TaskView: FunctionComponent<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onClick={() => dispatch(toggleTask(task.id))}
      />
      <input type="text" value={task.message} />
    </li>
  );
};
