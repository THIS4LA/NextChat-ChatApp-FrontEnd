import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateLastMessage } from "./conversationSlice";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/messages/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data; // response from backend
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (sendForm, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/messages/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    conversation: {},
    loading: false,
    error: null,
    sendLoading: false,
    sendError: null,
    sendMessage: [],
  },
  reducers: {
    addSocketMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
        state.conversation = action.payload.conversation;
        console.log(action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendLoading = false;
        state.sendMessage = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendLoading = false;
        state.sendError = action.error.message;
      });
  },
});

export const { addSocketMessage } = messageSlice.actions;
export default messageSlice.reducer;
