import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../redux/taskListSlice'

export const store = configureStore({
  reducer: {
    taskReducer: taskReducer,
  },
})

const { dispatch } = store;

export {dispatch}