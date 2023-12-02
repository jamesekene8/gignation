import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Router } from "../routes/Routes";

const initialState = {
  user: null,
  token: localStorage.getItem("jwt"),
  loading: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  loginError: null,
  registerError: null,
  error: null,
  refreshTokenTimeout: null,
};

export const getCurrentUser = createAsyncThunk(
  "account/getCurrentUser",
  async () => {
    try {
      const response = await agent.Account.current();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "account/loginUser",
  async (userData) => {
    try {
      const response = await agent.Account.login(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "account/registerUser",
  async (userData) => {
    try {
      let response = await agent.Account.register(userData);
      return response;
    } catch (error) {
      throw error[0];
    }
  }
);

function setToken(token) {
  if (token) {
    localStorage.setItem("jwt", token);
  } else {
    localStorage.removeItem("jwt");
  }
}

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      setToken(null);
      Router.navigate("/login");
    },
  },

  extraReducers: (builder) => {
    const loginPending = (state) => {
      state.loading = true;
      state.loginError = null;
    };

    const loginFulfilled = (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload;
      setToken(state.token);
      if (action.payload.role === "Admin") {
        Router.navigate("/admin/jobs");
      } else {
        Router.navigate("/jobs");
      }
    };

    const loginRejected = (state, action) => {
      state.loading = false;
      state.loginError = action.error.message;
    };

    const registerPending = (state) => {
      state.loading = true;
      state.registerError = null;
    };

    const registerFulfilled = (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload;
      setToken(state.token);
      Router.navigate("/profile/edit");
    };

    const registerRejected = (state, action) => {
      state.loading = false;
      state.registerError = action.error.message;
    };

    const getCurrentUserPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const getCurrentUserFulfilled = (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload;
    };

    const getCurrentUserRejected = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    };

    builder
      .addCase(loginUser.pending, loginPending)
      .addCase(loginUser.fulfilled, loginFulfilled)
      .addCase(loginUser.rejected, loginRejected)
      .addCase(registerUser.pending, registerPending)
      .addCase(registerUser.fulfilled, registerFulfilled)
      .addCase(registerUser.rejected, registerRejected)
      .addCase(getCurrentUser.pending, getCurrentUserPending)
      .addCase(getCurrentUser.fulfilled, getCurrentUserFulfilled)
      .addCase(getCurrentUser.rejected, getCurrentUserRejected);
  },
});

export const { logoutUser } = accountSlice.actions;

export default accountSlice.reducer;
