import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { toast } from "react-toastify";

const initialState = {
  experiences: [],
  loading: false,
};

export const addExperience = createAsyncThunk(
  "experience/addExperience",
  async (exp) => {
    try {
      const response = await agent.Experience.create(exp);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getExperiences = createAsyncThunk(
  "experience/getExperiences",
  async () => {
    try {
      const response = await agent.Experience.list();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const removeExperience = createAsyncThunk(
  "experience/removeExperience",
  async (id) => {
    try {
      const response = await agent.Experience.delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const addExperiencePending = (state) => {
      state.loading = true;
    };

    const addExperienceFulfilled = (state, action) => {
      state.loading = false;
      state.experiences = [...state.experiences, action.payload];
      toast.success("Profile Updated Successfully");
    };

    const addExperienceRejected = (state, action) => {
      state.loading = false;
    };

    const getExperiencePending = (state) => {
      state.loading = true;
    };

    const getExperienceFulfilled = (state, action) => {
      state.loading = false;
      state.experiences = [...action.payload];
    };

    const getExperienceRejected = (state, action) => {
      state.loading = false;
    };

    const removeExperiencePending = (state) => {
      state.loading = true;
    };

    const removeExperienceFulfilled = (state, action) => {
      state.loading = false;
      state.experiences = state.experiences.filter(
        (edu) => edu.id !== action.payload.id
      );
      toast.success("Profile Updated Successfully");
    };

    const removeExperienceRejected = (state, action) => {
      state.loading = false;
      toast.error("Unable to delete experience");
    };

    builder
      .addCase(addExperience.pending, addExperiencePending)
      .addCase(addExperience.fulfilled, addExperienceFulfilled)
      .addCase(addExperience.rejected, addExperienceRejected)
      .addCase(getExperiences.pending, getExperiencePending)
      .addCase(getExperiences.fulfilled, getExperienceFulfilled)
      .addCase(getExperiences.rejected, getExperienceRejected)
      .addCase(removeExperience.pending, removeExperiencePending)
      .addCase(removeExperience.fulfilled, removeExperienceFulfilled)
      .addCase(removeExperience.rejected, removeExperienceRejected);
  },
});

export default experienceSlice.reducer;
