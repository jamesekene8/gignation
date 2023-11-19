import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";

const initialState = {
  profile: null,
  loading: false,
};

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  try {
    const response = await agent.Profile.getProfile();
    return response;
  } catch (error) {
    throw error;
  }
});

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (user) => {
    try {
      const response = await agent.Profile.updateProfile(user);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const getProfilePending = (state) => {
      state.loading = true;
    };

    const getProfileFulfilled = (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    };

    const getProfileRejected = (state, action) => {
      state.loading = false;
    };

    const updateProfilePending = (state) => {
      state.loading = true;
    };

    const updateProfileFulfilled = (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    };

    const updateProfileRejected = (state, action) => {
      state.loading = false;
    };

    builder
      .addCase(getProfile.pending, getProfilePending)
      .addCase(getProfile.fulfilled, getProfileFulfilled)
      .addCase(getProfile.rejected, getProfileRejected)
      .addCase(updateProfile.pending, updateProfilePending)
      .addCase(updateProfile.fulfilled, updateProfileFulfilled)
      .addCase(updateProfile.rejected, updateProfileRejected);
  },
});

export default profileSlice.reducer;
