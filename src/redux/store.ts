import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import commentsReducer from './features/commentsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
