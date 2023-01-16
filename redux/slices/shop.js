import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    settings: {
        tax: 0,
        discount: 0,
        currency: 'USD',
    },
    cart: {
        items: [],
        total: 0,
    },
}

const shopSlice = createSlice({
    name: 'Shop',
    initialState,
    reducers: {
        addCartItem(state, {payload}) {
            const newItem = {
                item: payload.item || 'Cart item',
                quantity: Number(payload.quantity) || 1,
                price: Number(payload.price) || 0,
                tax: Number(payload.tax) || state.settings.tax,
                discount: Number(payload.discount) || state.settings.discount,
                id: payload.id,
            };
            newItem.priceTotal = (newItem.price + (newItem.price * newItem.tax / 100) - (newItem.price * newItem.discount / 100)) * newItem.quantity;
            
            state.cart.items.push(newItem);
            state.cart.total += newItem.priceTotal;
        },
        deleteCartItem(state, {payload}) {
            state.cart.items = state.cart.items.filter(item => item.id !== payload.id);
            state.cart.total -= payload.priceTotal;
        },
    }
});

export const shopActions = shopSlice.actions;
export default shopSlice;