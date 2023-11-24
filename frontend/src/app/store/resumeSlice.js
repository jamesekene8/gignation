import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { toast } from "react-toastify";

const initialState = {
  resume: null,
  loading: false,
  error: null,
};

export const uploadResume = createAsyncThunk(
  "resume/uploadResume",
  async (value) => {
    try {
      const response = await agent.Resume.add(value);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getResume = createAsyncThunk("resume/getResume", async (value) => {
  try {
    const response = await agent.Resume.get();
    return response;
  } catch (error) {
    throw error;
  }
});

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const uploadResumePending = (state) => {
      state.loading = true;
    };

    const uploadResumeFulfilled = (state, action) => {
      state.loading = false;
      toast.success("Resume Uploaded Successfully");
    };

    const uploadResumeRejected = (state, action) => {
      state.loading = false;
      toast.error("Resume upload failed");
    };

    const getResumePending = (state) => {
      state.loading = true;
    };

    const getResumeFulfilled = (state, action) => {
      state.loading = false;
      state.resume = action.payload.resume;
    };

    const getResumeRejected = (state, action) => {
      state.loading = false;
    };

    builder
      .addCase(uploadResume.pending, uploadResumePending)
      .addCase(uploadResume.fulfilled, uploadResumeFulfilled)
      .addCase(uploadResume.rejected, uploadResumeRejected)
      .addCase(getResume.pending, getResumePending)
      .addCase(getResume.fulfilled, getResumeFulfilled)
      .addCase(getResume.rejected, getResumeRejected);
  },
});

export default resumeSlice.reducer;
