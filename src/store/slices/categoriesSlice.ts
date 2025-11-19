import {
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchReadCategories,
  fetchUpdateCategory,
} from "../thunks/categoriesThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  is_featured?: boolean;
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}
const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // اختياري: reducers متزامنة للاستخدامات المحلية
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const i = state.items.findIndex((c) => c.id === action.payload.id);
      if (i !== -1) state.items[i] = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // read
      .addCase(fetchReadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      // create
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // update
      .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        const i = state.items.findIndex((c) => c.id === action.payload.id);
        if (i !== -1) state.items[i] = action.payload;
      })
      // delete
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
