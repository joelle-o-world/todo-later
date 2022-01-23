import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, TaskId } from "./tasksSlice";
import { MdOutlineDelete } from "react-icons/md";

export const DeleteTaskButton: FunctionComponent<{ taskId: TaskId }> = ({
  taskId,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      className="DeleteTaskButton"
      onClick={() => dispatch(deleteTask(taskId))}
    >
      <MdOutlineDelete />
    </button>
  );
};
