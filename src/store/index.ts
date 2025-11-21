import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/usersSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // غير مطلوب عادة لأن redux-thunk مضاف افتراضياً
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
