import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockCategories } from '@/lib/mockData';

export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface CategoriesState {
  categories: Category[];
}

const loadCategoriesFromStorage = (): Category[] => {
  try {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : mockCategories;
  } catch {
    return mockCategories;
  }
};

const saveCategoriesToStorage = (categories: Category[]) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

const initialState: CategoriesState = {
  categories: loadCategoriesFromStorage(),
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      saveCategoriesToStorage(state.categories);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
        saveCategoriesToStorage(state.categories);
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
      saveCategoriesToStorage(state.categories);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
