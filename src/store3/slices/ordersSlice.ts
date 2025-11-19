import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export interface OrderMessage {
  id: string;
  sender: 'admin' | 'customer';
  text: string;
  timestamp: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  currency: 'SYP' | 'USD';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  messages: OrderMessage[];
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
}

const loadOrdersFromStorage = (): Order[] => {
  try {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
};

const saveOrdersToStorage = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

const initialState: OrdersState = {
  orders: loadOrdersFromStorage(),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveOrdersToStorage(state.orders);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
        saveOrdersToStorage(state.orders);
      }
    },
    addMessage: (state, action: PayloadAction<{ orderId: string; message: OrderMessage }>) => {
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.messages.push(action.payload.message);
        saveOrdersToStorage(state.orders);
      }
    },
  },
});

export const { addOrder, updateOrderStatus, addMessage } = ordersSlice.actions;
export default ordersSlice.reducer;
