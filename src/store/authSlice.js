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
  isInitialized: false, // Add flag to track if auth has been initialized
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
      // Save to localStorage
      localStorage.setItem('agroscan_token', action.payload.token);
      localStorage.setItem('agroscan_user', JSON.stringify(action.payload.user));
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
      // Save to localStorage
      localStorage.setItem('agroscan_token', action.payload.token);
      localStorage.setItem('agroscan_user', JSON.stringify(action.payload.user));
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
      // Clear localStorage
      localStorage.removeItem('agroscan_token');
      localStorage.removeItem('agroscan_user');
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      // Check if token and user data exist in storage
      const token = localStorage.getItem('agroscan_token');
      const userData = localStorage.getItem('agroscan_user');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          state.isAuthenticated = true;
          state.token = token;
          state.user = user;
          setAuthToken(token);
        } catch (error) {
          // If user data is corrupted, clear it
          localStorage.removeItem('agroscan_token');
          localStorage.removeItem('agroscan_user');
        }
      }
      state.isInitialized = true;
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
