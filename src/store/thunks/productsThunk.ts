import { read, create, update, del } from "@/api/crud";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
// Fetch products
export const fetchReadProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchFeatured", async (_, thunkAPI) => {
  try {
    const data = await read("products");
    return data || [];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to fetch products");
  }
});

// Create product
export const fetchCreateProduct = createAsyncThunk<
  Product,
  Product, // هنا لازم تمرر المنتج الجديد
  { rejectValue: string }
>("products/addProduct", async (product, thunkAPI) => {
  try {
    const data = await create("products", product);
    if (!data) throw new Error("No product created");
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to create product");
  }
});

// Update product
export const fetchUpdateProduct = createAsyncThunk<
  Product,
  Product, // المنتج المعدل
  { rejectValue: string }
>("products/updateProduct", async (productUpdated, thunkAPI) => {
  try {
    //console.log("thunki===========", productUpdated);

    const data = await update("products", productUpdated);
    if (!data) throw new Error("No product updated");
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to update product");
  }
});

// Delete product
export const fetchDelProduct = createAsyncThunk<
  string, // نرجع الـ id المحذوف
  string, // نمرر الـ id كـ argument
  { rejectValue: string }
>("products/deleteProduct", async (productId, thunkAPI) => {
  try {
    const data = await del("products", productId);
    if (!data) throw new Error("No product deleted");
    return productId;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to delete product");
  }
});
