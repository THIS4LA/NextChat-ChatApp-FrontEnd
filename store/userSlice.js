import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "./authSlice";

// 🔹 Fetch available users
export const getAvailableUsers = createAsyncThunk(
  "user/getAvailableUsers",
  async (query, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/search?q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data?.message || "Failed to fetch users");

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data?.message || "Failed to fetch user");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (form, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const id = state.auth.user?._id;

      if (!id) throw new Error("User ID not found in state");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok)
        return rejectWithValue(data?.message || "Failed to update user");

      //update auth user state
      dispatch(setAuthUser(data));

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    onlineUsers: [],
    loading: false,
    error: null,
    selectedUser: null,
    selectedUserLoading: false,
    selectedUserError: null,
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAvailableUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;

        // Update the user in the users array if present
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      .addCase(getUserById.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserError = action.payload;
      });
  },
});

export const { setOnlineUsers, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
