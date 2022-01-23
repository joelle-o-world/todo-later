import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "../../app/store";

export type TaskId = string;
export interface Task {
  id: TaskId;
  completed: boolean;
  message: string;
  blockedBy: TaskId[];
}

export interface TasksState {
  tasks: {
    [taskId: string]: Task;
  };
}

const initialState: TasksState = {
  tasks: {},
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const taskId = uuid();
      const message: string = action.payload;
      state.tasks[taskId] = {
        id: taskId,
        completed: false,
        message,
        blockedBy: [],
      };
    },

    addDependency: (
      state,
      action: PayloadAction<{ dependentTaskId: TaskId; message: string }>
    ) => {
      const { message, dependentTaskId } = action.payload;
      const taskId = uuid();
      state.tasks[taskId] = {
        id: taskId,
        completed: false,
        message: message,
        blockedBy: [],
      };
      const dependent = state.tasks[dependentTaskId];
      dependent.blockedBy = dependent.blockedBy
        ? [...dependent.blockedBy, taskId]
        : [taskId];
    },

    assignDependency: (
      state,
      action: PayloadAction<{
        dependentTaskId: TaskId;
        dependencyTaskId: TaskId;
      }>
    ) => {
      const { dependentTaskId, dependencyTaskId } = action.payload;
      const dependent = state.tasks[dependentTaskId];
      dependent.blockedBy = dependent.blockedBy
        ? [...dependent.blockedBy, dependencyTaskId]
        : [dependencyTaskId];
    },

    completeTask: (state, action: PayloadAction<TaskId>) => {
      const task = state.tasks[action.payload];
      task.completed = true;
    },

    setTaskCompleted: (
      state,
      action: PayloadAction<{ taskId: TaskId; completed: boolean }>
    ) => {
      const task = state.tasks[action.payload.taskId];
      task.completed = action.payload.completed;
    },

    toggleTask: (state, action: PayloadAction<TaskId>) => {
      const task = state.tasks[action.payload];
      task.completed = !task.completed;
    },

    deleteTask: (state, action: PayloadAction<TaskId>) => {
      // FIXME: This isn't working...
      for (let task of Object.values(state.tasks))
        if (task.blockedBy)
          task.blockedBy = task.blockedBy.filter((id) => id !== action.payload);
      delete state.tasks[action.payload];
    },

    editTaskMessage: (
      state,
      action: PayloadAction<{ taskId: TaskId; message: string }>
    ) => {
      if (action.payload.message)
        state.tasks[action.payload.taskId].message = action.payload.message;
      else delete state.tasks[action.payload.taskId];
    },
  },
});

export const {
  addTask,
  addDependency,
  assignDependency,
  completeTask,
  setTaskCompleted,
  toggleTask,
  deleteTask,
  editTaskMessage,
} = tasksSlice.actions;

export const selectTaskById = (taskId: TaskId) => (state: RootState) =>
  state.tasks.tasks[taskId];

export const selectAllTasks = (state: RootState) =>
  Object.values(state.tasks.tasks);

export const selectUnblockedTasks = (state: RootState) =>
  Object.values(state.tasks.tasks).filter(
    (task: Task) =>
      !task.blockedBy ||
      task.blockedBy.every(
        (blockerId) =>
          !state.tasks.tasks[blockerId] ||
          state.tasks.tasks[blockerId].completed
      )
  );

export const selectBlockedTasks = (state: RootState) =>
  Object.values(state.tasks.tasks).filter((task) =>
    task?.blockedBy.some(
      (blockerId) => state.tasks.tasks[blockerId]?.completed === false
    )
  );

export const selectTasksBlockedBy = (taskId: TaskId) => (state: RootState) => {
  let tasks = [state.tasks.tasks[taskId]];

  for (let i = 0; i < tasks.length; ++i)
    for (let newTask of Object.values(state.tasks.tasks).filter((task) =>
      task.blockedBy?.includes(tasks[i].id)
    )) {
      if (!tasks.includes(newTask)) tasks.push(newTask);
    }

  return tasks.slice(1);
};

export const selectBlockersFor = (taskId: TaskId) => (state: RootState) => {
  let tasks = [state.tasks.tasks[taskId]];
  for (let i = 0; i < tasks.length; ++i)
    if (tasks[i].blockedBy)
      for (let blockerId of tasks[i].blockedBy) {
        let blocker = state.tasks.tasks?.[blockerId];
        if (blocker && !tasks.includes(blocker)) tasks.push(blocker);
      }
  return tasks.slice(1);
};

export default tasksSlice.reducer;
