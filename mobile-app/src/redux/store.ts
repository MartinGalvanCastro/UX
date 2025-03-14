// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { alarmReducer } from './alarmSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alarm: alarmReducer,
  },
});

// Export RootState and AppDispatch for use in your application.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
