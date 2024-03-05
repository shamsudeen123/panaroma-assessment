import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "./store";

const initialState = {
  isLoading: true,
  error: null,
  taskList: null,
};

const slice = createSlice({
  name: "Task List",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CATEGORY
    taskListApiSuccess(state, action) {
      state.isLoading = false;
      state.taskList = action.payload;
    },
  },
});

export const { actions: taskSliceActions, reducer: taskSliceReducer } = slice;
// Reducer
export default slice.reducer;

// Actions

export function getTaskList(endpoint, requestBody) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        dispatch(
          slice.actions.taskListApiSuccess(response.data)
        );
      }
    } catch (error) {
      dispatch(
        slice.actions.hasError(error)
      );
    }
  };
}