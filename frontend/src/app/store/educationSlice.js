import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { toast } from "react-toastify";

const initialState = {
  educations: [],
  loading: false,
};

export const addEducation = createAsyncThunk(
  "education/addEducation",
  async (edu) => {
    try {
      const response = await agent.Education.create(edu);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getEducations = createAsyncThunk(
  "education/getEducations",
  async () => {
    try {
      const response = await agent.Education.list();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const removeEducation = createAsyncThunk(
  "education/removeEducation",
  async (id) => {
    try {
      const response = await agent.Education.delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const addEducationPending = (state) => {
      state.loading = true;
    };

    const addEducationFulfilled = (state, action) => {
      state.loading = false;
      state.educations = [...state.educations, action.payload];
      toast.success("Profile Updated Succefully");
    };

    const addEducationRejected = (state, action) => {
      state.loading = false;
    };

    const getEducationPending = (state) => {
      state.loading = true;
    };

    const getEducationFulfilled = (state, action) => {
      state.loading = false;
      state.educations = action.payload;
    };

    const getEducationRejected = (state, action) => {
      state.loading = false;
    };

    const removeEducationPending = (state) => {
      state.loading = true;
    };

    const removeEducationFulfilled = (state, action) => {
      state.loading = false;
      state.educations = state.educations.filter(
        (edu) => edu.id !== action.payload.id
      );
      toast.success("Profile Updated Succefully");
    };

    const removeEducationRejected = (state, action) => {
      state.loading = false;
      toast.error("Unable to delete education");
    };

    builder
      .addCase(addEducation.pending, addEducationPending)
      .addCase(addEducation.fulfilled, addEducationFulfilled)
      .addCase(addEducation.rejected, addEducationRejected)
      .addCase(getEducations.pending, getEducationPending)
      .addCase(getEducations.fulfilled, getEducationFulfilled)
      .addCase(getEducations.rejected, getEducationRejected)
      .addCase(removeEducation.pending, removeEducationPending)
      .addCase(removeEducation.fulfilled, removeEducationFulfilled)
      .addCase(removeEducation.rejected, removeEducationRejected);
  },
});

export default educationSlice.reducer;
