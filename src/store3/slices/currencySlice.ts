import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  current: 'SYP' | 'USD';
  exchangeRate: number;
}

const loadCurrencyFromStorage = (): 'SYP' | 'USD' => {
  try {
    const currency = localStorage.getItem('currency');
    return (currency as 'SYP' | 'USD') || 'SYP';
  } catch {
    return 'SYP';
  }
};

const initialState: CurrencyState = {
  current: loadCurrencyFromStorage(),
  exchangeRate: 15000, // 1 USD = 15000 SYP (example rate)
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<'SYP' | 'USD'>) => {
      state.current = action.payload;
      localStorage.setItem('currency', action.payload);
    },
    setExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload;
    },
  },
});

export const { setCurrency, setExchangeRate } = currencySlice.actions;
export default currencySlice.reducer;
