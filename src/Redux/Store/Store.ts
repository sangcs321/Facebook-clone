import { configureStore } from '@reduxjs/toolkit'
import { UserApi } from '@Redux/RTKQuery/UserApi'
import userReducer from '@Redux/Slice/UserSlice'
import { PostApi } from '@Redux/RTKQuery/PostApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware).concat(PostApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;