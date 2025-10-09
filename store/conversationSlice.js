import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/conversations/",
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

const conversationSlice = createSlice({
  name: "conversations",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    updateLastMessage: (state, action) => {
      const { conversationId, lastMessage, updatedAt } = action.payload;
      const conv = state.list.find((c) => c._id === conversationId);
      if (conv) {
        conv.lastMessage = lastMessage;
        if (updatedAt) conv.updatedAt = updatedAt;
        const idx = state.list.indexOf(conv);
        if (idx > 0) {
          state.list.splice(idx, 1);
          state.list.unshift(conv);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateLastMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
