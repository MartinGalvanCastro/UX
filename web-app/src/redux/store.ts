// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Defines notification preferences for the user */
export interface NotificationPreferences {
  email: boolean;
  pushNotification: boolean;
  sms: boolean;
}

export interface UserState {
  name: string;
  email: string;
  password: string;
  isAuth: boolean;
  notificationPreferences: NotificationPreferences;
}

const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  isAuth: false,
  notificationPreferences: {
    email: false,
    pushNotification: false,
    sms: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sets the entire user object and marks the user as authenticated.
    setUser: (state, action: PayloadAction<UserState>): UserState => {
      return { ...action.payload, isAuth: true };
    },
    // Updates only the name.
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Updates only the email.
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    // Updates only the password.
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    // Sets the isAuth flag.
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    // Clears the user data and marks the user as not authenticated.
    logout: (state) => {
      state.isAuth = false;
      // Optionally clear other user fields if desired.
      // e.g. state.name = ''; state.email = ''; state.password = '';
    },
    // Updates the notification preferences object.
    updateNotificationPreferences: (
      state,
      action: PayloadAction<NotificationPreferences>
    ) => {
      state.notificationPreferences = action.payload;
    },
  },
});

export const {
  setUser,
  updateName,
  updateEmail,
  updatePassword,
  setAuth,
  logout,
  updateNotificationPreferences,
} = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Define RootState and AppDispatch for usage in your application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
