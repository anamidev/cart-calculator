import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    settings: {
        baseTax: 0,
        baseDiscount: 0,
    },
    list: {
        items: [],
        total: {
            price: 0,
            items: 0,
        }
    },
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        list_addItem(state, {payload}) {
            const item = {
                id: String(Date.now()),
                item: payload.item || `Cart item ${state.list.items.length + 1}`,
                price: Number(payload.price) || 0.00,
                quantity: Number(payload.quantity),
                discount: Number(payload.discount),
                tax: Number(payload.tax),
                priceTotal: 0,
            };
            item.priceTotal = (item.price - (item.price * item.discount/100) + (item.price * item.tax/100)) * item.quantity;
            
            state.list.items.push(item);
            state.list.total.price += item.priceTotal;
            state.list.total.items += 1;
        },
        list_deleteItem(state, {payload}) {
            state.list.items = state.list.items.filter(item => item.id !== payload.id);
            
            state.list.total.price -= payload.priceTotal;
            state.list.total.items -= 1;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;