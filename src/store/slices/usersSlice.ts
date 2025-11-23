import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCreateUser,
  fetchDelUser,
  fetchReadUsers,
  fetchUpdateUser,
} from "../thunks/usersThunck";

export interface User {
  id: string;
  name: string;
  is_featured?: boolean;
}

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
  currentUser: User | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
  currentUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<User>) => {
      console.log("------------------------------------------------");

      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchReadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Unknown error";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchDelUser.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setUserAuth } = usersSlice.actions;
export default usersSlice.reducer;
