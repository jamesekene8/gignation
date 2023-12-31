import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../store/accountSlice";
import jobReducer from "../store/jobSlice";
import profileReducer from "../store/profileSlice";
import educationReducer from "../store/educationSlice";
import experienceReducer from "../store/experienceSlice";
import commentReducer from "../store/commentSlice";
import resumeReducer from "../store/resumeSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    job: jobReducer,
    profile: profileReducer,
    education: educationReducer,
    experience: experienceReducer,
    comments: commentReducer,
    resume: resumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
