import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateOrder,
  fetchDelOrder,
  fetchReadOrders,
  fetchUpdateOrder,
} from "../thunks/orderThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchReadOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        console.log(action.payload);

        state.items.push(action.payload);
      })
      .addCase(fetchUpdateOrder.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        console.log("index:", index);

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(fetchDelOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
