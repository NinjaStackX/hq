import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  // size?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const calculateTotal = (items: CartItem[]): number => {
  //console.log("items==>>>", items);

  const tot = items.reduce(
    (sum, item) => sum + item.price_syp * item.quantity,
    0
  );
  //console.log(tot);

  return tot;
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  total: 0,
};

initialState.total = calculateTotal(initialState.items);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) existingItem.quantity += 1; // action.payload.quantity;
      else state.items.push({ quantity: 1, ...action.payload });
      const x = JSON.stringify(state.items);
      //console.log(JSON.parse(x));

      state.total = calculateTotal(state.items);
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      saveCartToStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
