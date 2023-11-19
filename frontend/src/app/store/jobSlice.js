import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Router } from "../routes/Routes";

let initialState = {
  jobs: [],
  job: null,
  loading: false,
  error: null,
  userJobApplications: [],
  jobApplicants: [],
};

export const getJobs = createAsyncThunk("job/getJobs", async () => {
  try {
    const response = await agent.Jobs.list();
    return response;
  } catch (error) {
    throw error;
  }
});

export const applyForJob = createAsyncThunk("job/apply", async (value) => {
  try {
    const response = await agent.Jobs.apply(value.id, value.data);
    return response;
  } catch (error) {
    throw error;
  }
});

export const getUserJobApplications = createAsyncThunk(
  "job/userApplications",
  async () => {
    try {
      const response = await agent.Jobs.applied();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const retrieveJobApplication = createAsyncThunk(
  "job/cancelApplication",
  async (id) => {
    try {
      const response = await agent.Jobs.retrieve(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const createJob = createAsyncThunk("/job/create", async (job) => {
  try {
    const response = await agent.Jobs.create(job);
    return response;
  } catch (error) {
    throw error;
  }
});

export const getJobApplications = createAsyncThunk(
  "/job/getApplications",
  async (id) => {
    try {
      const response = await agent.Jobs.applications(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getJob = createAsyncThunk("/job/getJob", async (id) => {
  try {
    const response = await agent.Jobs.getJob(id);
    return response;
  } catch (error) {
    throw error;
  }
});

export const deleteJob = createAsyncThunk("/job/deleteJob", async (id) => {
  try {
    const response = await agent.Jobs.delete(id);
    return response;
  } catch (error) {
    throw error;
  }
});

export const updateJob = createAsyncThunk("/job/updateJob", async (body) => {
  try {
    const response = await agent.Jobs.updateJob(body.id, body.values);
    return response;
  } catch (error) {
    throw error;
  }
});

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducer: {},

  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const commonFulfilled = (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    };

    const commonRejected = (state, action) => {
      state.loading = false;
      //state.error = action.error.message;
    };
    const applicationPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const applicationFulfilled = (state, action) => {
      state.loading = false;
      state.jobs = state.jobs.map((job) => {
        if (job.id === action.payload.id) {
          return {
            ...job,
            applied: true,
          };
        }
        return { ...job };
      });
      console.log("The cureent jobs are: " + state.jobs);
    };

    const applicationRejected = (state, action) => {
      state.loading = false;
    };

    const userApplicationsPending = (state, action) => {
      state.loading = true;
    };

    const userApplicationsFulfilled = (state, action) => {
      state.loading = false;
      state.userJobApplications = [...action.payload];
    };

    const userApplicationsRejected = (state, action) => {
      state.loading = false;
    };

    const retrieveApplicationPending = (state, action) => {
      state.loading = true;
    };

    const retrieveApplicationFulfilled = (state, action) => {
      state.loading = false;
      state.userJobApplications = state.userJobApplications.filter(
        (jobApp) => jobApp.job.id !== action.payload.id
      );
      Router.navigate("/jobs/applied");
    };

    const retrieveApplicationRejected = (state, action) => {
      state.loading = false;
    };

    const createJobPending = (state, action) => {
      state.loading = true;
    };

    const createJobFulfilled = (state, action) => {
      state.loading = false;
    };

    const createJobRejected = (state, action) => {
      state.loading = false;
    };

    const getJobApplicationsPending = (state, action) => {
      state.loading = true;
    };

    const getJobApplicationsFulfilled = (state, action) => {
      state.loading = false;
      state.jobApplicants = [...action.payload];
    };

    const getJobApplicationsRejected = (state, action) => {
      state.loading = false;
    };

    const getJobPending = (state, action) => {
      state.loading = true;
    };

    const getJobFulfilled = (state, action) => {
      state.loading = false;
      state.job = action.payload;
    };

    const getJobRejected = (state, action) => {
      state.loading = false;
    };

    const deleteJobPending = (state, action) => {
      state.loading = true;
    };

    const deleteJobFulfilled = (state, action) => {
      state.loading = false;
      state.jobs = state.jobs.filter((job) => job.id !== action.payload.id);
    };

    const deleteJobRejected = (state, action) => {
      state.loading = false;
    };

    const updateJobPending = (state, action) => {
      state.loading = true;
    };

    const updateJobFulfilled = (state, action) => {
      state.loading = false;
    };

    const updateJobRejected = (state, action) => {
      state.loading = false;
    };

    builder
      .addCase(getJobs.pending, commonPending)
      .addCase(getJobs.fulfilled, commonFulfilled)
      .addCase(getJobs.rejected, commonRejected)
      .addCase(applyForJob.pending, applicationPending)
      .addCase(applyForJob.fulfilled, applicationFulfilled)
      .addCase(applyForJob.rejected, applicationRejected)
      .addCase(getUserJobApplications.pending, userApplicationsPending)
      .addCase(getUserJobApplications.fulfilled, userApplicationsFulfilled)
      .addCase(getUserJobApplications.rejected, userApplicationsRejected)
      .addCase(retrieveJobApplication.pending, retrieveApplicationPending)
      .addCase(retrieveJobApplication.fulfilled, retrieveApplicationFulfilled)
      .addCase(retrieveJobApplication.rejected, retrieveApplicationRejected)
      .addCase(createJob.pending, createJobPending)
      .addCase(createJob.fulfilled, createJobFulfilled)
      .addCase(createJob.rejected, createJobRejected)
      .addCase(getJobApplications.pending, getJobApplicationsPending)
      .addCase(getJobApplications.fulfilled, getJobApplicationsFulfilled)
      .addCase(getJobApplications.rejected, getJobApplicationsRejected)
      .addCase(getJob.pending, getJobPending)
      .addCase(getJob.fulfilled, getJobFulfilled)
      .addCase(getJob.rejected, getJobRejected)
      .addCase(deleteJob.pending, deleteJobPending)
      .addCase(deleteJob.fulfilled, deleteJobFulfilled)
      .addCase(deleteJob.rejected, deleteJobRejected)
      .addCase(updateJob.pending, updateJobPending)
      .addCase(updateJob.fulfilled, updateJobFulfilled)
      .addCase(updateJob.rejected, updateJobRejected);
  },
});

export default jobSlice.reducer;
