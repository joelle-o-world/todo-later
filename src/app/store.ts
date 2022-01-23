import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import settingsReducer from "../features/settings/settingsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage },
    combineReducers({
      tasks: tasksReducer,
      settings: settingsReducer,
    })
  ),
});
persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
