// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartslice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});