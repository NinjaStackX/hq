import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCreateProduct,
  fetchDelProduct,
  fetchReadProducts,
  fetchUpdateProduct,
} from "../thunks/productsThunk";

export interface Product {
  id: string;
  name: string;
  is_featured?: boolean;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchReadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(fetchCreateProduct.fulfilled, (state, action) => {
        console.log(action.payload);

        state.items.push(action.payload);
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        console.log("index:", index);

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(fetchDelProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
