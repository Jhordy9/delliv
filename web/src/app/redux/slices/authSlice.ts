import { axiosRq } from '@/app/services/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  jwtToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosRq.post<{ access_token: string }>(
        '/auth/login',
        { ...userData }
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const persistedToken = localStorage.getItem('auth');

const initialState: AuthState = {
  jwtToken: persistedToken,
  isAuthenticated: !!persistedToken,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.jwtToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ access_token: string }>) => {
          state.jwtToken = action.payload.access_token;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem('auth', action.payload.access_token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        console.log('Login rejected:', action.error);
        state.error = 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
