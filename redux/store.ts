import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '@/redux/slices/cart';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
