import { del, read, update, create } from "@/api/crud";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReadOrders = createAsyncThunk(
  "orders/readAll",
  async (_, thunkAPI) => {
    try {
      return await read("orders");
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message ?? "Failed to fetch orders");
    }
  }
);

export const fetchCreateOrder = createAsyncThunk(
  "orders/create",
  async (order, thunkAPI) => {
    try {
      const data = await create("orders", order);
      if (!data) throw new Error("No order created");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message ?? "Failed to create order");
    }
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  "orders/update",
  async (order, thunkAPI) => {
    try {
      const data = await update("orders", order);
      if (!data) throw new Error("No order updated");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message ?? "Failed to update order");
    }
  }
);

export const fetchDelOrder = createAsyncThunk(
  "orders/delete",
  async (orderId, thunkAPI) => {
    try {
      return await del("orders", orderId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message ?? "Failed to delete order");
    }
  }
);
