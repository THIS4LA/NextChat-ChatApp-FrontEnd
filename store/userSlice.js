import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for registering user
export const getAvailableUsers = createAsyncThunk(
  "user/getAvailableUsers",
  async (query, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/users/search?q=${query}`,
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userLoading: false,
    userError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableUsers.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(getAvailableUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload;
        console.log(action.payload);
      })
      .addCase(getAvailableUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });
  },
});
export default userSlice.reducer;
