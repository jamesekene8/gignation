import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { store } from "./store";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const initialState = {
  comments: [],
  loading: false,
};

let hubConnection = null;

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (values) => {
    try {
      await hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createHubConnection: (state, action) => {
      if (action.payload.job) {
        hubConnection = new HubConnectionBuilder()
          .withUrl(
            import.meta.env.VITE_CHAT_URL + "?jobId=" + action.payload.job.id,
            {
              accessTokenFactory: () => action.payload.user?.token,
            }
          )
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Information)
          .build();

        hubConnection
          .start()
          .catch((error) =>
            console.log("Error extablishing the connection: ", error)
          );

        hubConnection.on("LoadComments", (comments) => {
          store.dispatch(setComments(comments));
        });

        hubConnection.on("ReceiveComment", (comment) => {
          store.dispatch(updateComments(comment));
        });
      }
    },

    setComments: (state, action) => {
      state.comments = action.payload;
    },

    updateComments: (state, action) => {
      state.comments.unshift(action.payload);
    },

    stopHubConnection: (state) => {
      hubConnection
        ?.stop()
        .catch((error) => console.log("Error stopping connection: ", error));
    },

    clearComments: (state) => {
      state.comments = [];
      commentSlice.caseReducers.stopHubConnection(state);
    },
  },

  extraReducers: (builder) => {
    const addCommentPending = (state) => {
      state.loading = true;
    };

    const addCommentFulfilled = (state, action) => {
      state.loading = false;
    };

    const addCommentRejected = (state, action) => {
      state.loading = false;
    };

    builder
      .addCase(addComment.pending, addCommentPending)
      .addCase(addComment.fulfilled, addCommentFulfilled)
      .addCase(addComment.rejected, addCommentRejected);
  },
});

export const {
  createHubConnection,
  stopHubConnection,
  clearComments,
  setComments,
  updateComments,
} = commentSlice.actions;

export default commentSlice.reducer;
