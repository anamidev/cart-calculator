import {createSlice} from "@reduxjs/toolkit";
import {roundNum} from "@/utils/roundNum";

const initialState = {
    settings: {
        baseTax: 0,
        baseDiscount: 0,
        currency: {
            primary: {
                rate: 1,
                symbol: '',
            },
            secondary: {
                rate: 0,
                symbol: '',
            },
        },
    },
    list: {
        items: [],
        total: {
            price: 0,
            items: 0,
            priceSecondary: 0,
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
            newItem.priceTotalSecondary = roundNum(newItem.priceTotal * state.settings.currency.secondary.rate);
            
            state.list.items.push(newItem);
            state.list.total.price = roundNum(state.list.total.price + newItem.priceTotal);
            state.list.total.items += 1;
            state.list.total.priceSecondary = roundNum(state.list.total.priceSecondary + newItem.priceTotalSecondary);
        },
        list_deleteItem(state, {payload}) {
            state.list.items = state.list.items.filter(item => item.id !== payload.id);
            
            state.list.total.price = roundNum(state.list.total.price - payload.priceTotal);
            state.list.total.items -= 1;
            state.list.total.priceSecondary = roundNum(state.list.total.priceSecondary - payload.priceTotalSecondary);
        },
        settings_set(state, {payload}) {
            state.settings.baseTax = roundNum(payload.baseTax);
            state.settings.baseDiscount = roundNum(payload.baseDiscount);
            state.settings.currency.primary.symbol = payload.primarySymbol;
            state.settings.currency.secondary.rate = roundNum(payload.secondaryRate);
            state.settings.currency.secondary.symbol = payload.secondarySymbol;
            
            try {
                localStorage.setItem('cart-settings', JSON.stringify(state.settings))
            } catch (e) {
                console.log('Unable to set settings to local storage.', e);
            }
            
            state.list.items.forEach(item => {
                item.priceTotalSecondary = roundNum(item.priceTotal * state.settings.currency.secondary.rate);
            })
            state.list.total.priceSecondary = roundNum(state.list.total.price * state.settings.currency.secondary.rate);
        },
        settings_get(state) {
            try {
                const localSettings = localStorage.getItem('cart-settings');
                if (localSettings) {
                    state.settings = JSON.parse(localSettings);
                }
            } catch (e) {
                console.log('Unable to get settings form local storage.', e);
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;