// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationPreferences {
  email: boolean;
  pushNotification: boolean;
  sms: boolean;
}

interface AuthUserPayload {
  name: string;
  email: string;
  password: string;
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sets the entire user object and marks as authenticated.
    setUser: (state, action: PayloadAction<AuthUserPayload>): UserState => ({
      ...state,
      ...action.payload,
      isAuth: true,
    }),
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.isAuth = false;
      state.notificationPreferences = { email: false, pushNotification: false, sms: false };
    },
    updateNotificationPreferences: (state, action: PayloadAction<NotificationPreferences>) => {
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

export const userReducer = userSlice.reducer;
