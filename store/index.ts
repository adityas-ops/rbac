// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import permissionReducer from './slices/permissionSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    roles: roleReducer,
    permissions: permissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
