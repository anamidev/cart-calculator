import {configureStore} from "@reduxjs/toolkit";
import shopSlice from "@/redux/slices/shop";

const store = configureStore({
    reducer: {
        shop: shopSlice.reducer,
    }
});

export default store;