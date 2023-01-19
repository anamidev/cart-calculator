import {createSlice} from "@reduxjs/toolkit";
import {roundNum} from "@/utils/roundNum";

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
        list_addItem(state, {payload: {item, price, quantity, discount, tax}}) {
            const newItem = {
                id: String(Date.now()),
                item: item || `Cart item ${state.list.items.length + 1}`,
                price,
                quantity,
                discount,
                tax,
            }
            newItem.priceTotal = roundNum((newItem.price - (newItem.price * newItem.discount/100) + (newItem.price * newItem.tax/100)) * newItem.quantity);

            state.list.items.push(newItem);
            state.list.total.price = roundNum(state.list.total.price + newItem.priceTotal);
            state.list.total.items += 1;
        },
        list_deleteItem(state, {payload}) {
            state.list.items = state.list.items.filter(item => item.id !== payload.id);
            
            state.list.total.price = roundNum(state.list.total.price - payload.priceTotal);
            state.list.total.items -= 1;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;