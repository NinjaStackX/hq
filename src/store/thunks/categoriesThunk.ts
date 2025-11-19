import { del, read, update, create } from "@/api/crud";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchReadCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/readAll", async (_, thunkAPI) => {
  try {
    return await read("categories");
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Failed to fetch categories"
    );
  }
});

export const fetchCreateCategory = createAsyncThunk<
  Category,
  Category,
  { rejectValue: string }
>("categories/create", async (category, thunkAPI) => {
  try {
    const data = await create("categories", category);
    if (!data) throw new Error("No category created");
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Failed to create category"
    );
  }
});

export const fetchUpdateCategory = createAsyncThunk<
  Category,
  Category,
  { rejectValue: string }
>("categories/update", async (category, thunkAPI) => {
  try {
    const data = await update("categories", category);
    if (!data) throw new Error("No category updated");
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Failed to update category"
    );
  }
});

export const fetchDeleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categories/delete", async (categoryId, thunkAPI) => {
  try {
    return await del("categories", categoryId);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Failed to delete category"
    );
  }
});
