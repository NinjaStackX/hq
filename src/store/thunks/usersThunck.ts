import { createAsyncThunk } from "@reduxjs/toolkit";
import { read, create, update, del } from "@/api/crud";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Fetch users
export const fetchReadUsers = createAsyncThunk(
  "users/fetchFeatured",
  async (_, thunkAPI) => {
    try {
      const data = await read("users");
      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch users");
    }
  }
);

// Create user
export const fetchCreateUser = createAsyncThunk(
  "users/addUser",
  async (user, thunkAPI) => {
    try {
      const data = await create("users", user);
      if (!data) throw new Error("No user created");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to create user");
    }
  }
);

// Update user
export const fetchUpdateUser = createAsyncThunk(
  "users/updateUser",
  async (userUpdated, thunkAPI) => {
    try {
      console.log("thunki===========", userUpdated);

      const data = await update("users", userUpdated);
      if (!data) throw new Error("No user updated");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to update user");
    }
  }
);

// Delete user
export const fetchDelUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const data = await del("users", userId);
      if (!data) throw new Error("No user deleted");
      return userId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to delete user");
    }
  }
);
