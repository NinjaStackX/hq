import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockProducts } from "@/lib/mockData";

export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price_syp: number;
  price_usd: number;
  stock: number;
  category_id: string;
  image_url: string;
  is_featured: boolean;
  slug: string;
  sizes?: string[];
  created_at: string;
  updated_at: string;
}

interface ProductsState {
  products: Product[];
}

const loadProductsFromStorage = (): Product[] => {
  try {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : mockProducts;
  } catch {
    return mockProducts;
  }
};

const saveProductsToStorage = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const initialState: ProductsState = {
  products: loadProductsFromStorage(),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveProductsToStorage(state.products);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        saveProductsToStorage(state.products);
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveProductsToStorage(state.products);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;

// dispatch(addProduct(newProduct));
// dispatch(updateProduct(updatedProduct));
// dispatch(deleteProduct(productId));
