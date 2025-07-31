import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@RTKQuery/userApi'
import userReducer from '@Slice/User'
import { postApi } from '@RTKQuery/postApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(postApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;