import { createSlice } from '@reduxjs/toolkit';
import { setAuthToken, loadAuthTokenFromStorage } from '../api/client.js';

// Load token from storage on app start
loadAuthTokenFromStorage();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      setAuthToken(action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      setAuthToken(action.payload.token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      setAuthToken(null);
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      // Check if token exists in storage
      const token = localStorage.getItem('agroscan_token');
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        // You might want to validate the token here
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
