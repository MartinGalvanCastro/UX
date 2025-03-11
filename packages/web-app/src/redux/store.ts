// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  email: string;
  password: string;
  isAuth: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sets the entire user object and marks the user as authenticated.
    setUser: (state: UserState, action: PayloadAction<UserState>): UserState => {
      return { ...action.payload, isAuth: true };
    },
    // Updates only the name.
    updateName: (state: UserState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Updates only the email.
    updateEmail: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    // Updates only the password.
    updatePassword: (state: UserState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    // Sets the isAuth flag.
    setAuth: (state: UserState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    // Clears the user data and marks the user as not authenticated.
    logout: (state: UserState) => {
      state.isAuth = false;
    },
  },
});

export const { setUser, updateName, updateEmail, updatePassword, setAuth, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Define RootState and AppDispatch for usage in your application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
