import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { roundNum2, roundNum4 } from '@/utils/roundNum2';

export interface CartItem {
    id: number;
    item: string;
    price: number;
    quantity: number;
    discount: number;
    tax: number;
    priceTotal: number;
    priceTotalSecondary: number;
}
export interface CartSettings {
    baseTax: number;
    baseDiscount: number;
    currency: {
        primary: {
            rate: 1;
            symbol: string;
        };
        secondary: {
            rate: number;
            symbol: string;
        };
    };
}
interface CartList {
    items: CartItem[];
    total: {
        price: number;
        items: number;
        priceSecondary: number;
    };
}
interface CartInitialState {
    settings: CartSettings;
    list: CartList;
}

const initialState: CartInitialState = {
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
        },
    },
};

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        list_addItem(state, action: PayloadAction<CartItem>) {
            state.list.items.push(action.payload);
            state.list.total.price = roundNum2(state.list.total.price + action.payload.priceTotal);
            state.list.total.items += 1;
            state.list.total.priceSecondary = roundNum2(
                state.list.total.priceSecondary + action.payload.priceTotalSecondary
            );
        },
        list_deleteItem(state, action: PayloadAction<CartItem>) {
            state.list.items = state.list.items.filter((item) => item.id !== action.payload.id);

            state.list.total.price = roundNum2(state.list.total.price - action.payload.priceTotal);
            state.list.total.items -= 1;
            state.list.total.priceSecondary = roundNum2(
                state.list.total.priceSecondary - action.payload.priceTotalSecondary
            );

            cartActions.list_save();
        },
        list_deleteAllItems(state) {
            state.list = {
                items: [],
                total: {
                    price: 0,
                    items: 0,
                    priceSecondary: 0,
                },
            };
        },

        list_save(state) {
            try {
                localStorage.setItem('cart-list', JSON.stringify(state.list));
            } catch (e) {
                console.log('Unable to save cart list to local storage.', e);
            }
        },
        list_retrieve(state) {
            try {
                const localList = localStorage.getItem('cart-list');
                if (localList) {
                    state.list = JSON.parse(localList);
                }
            } catch (e) {
                console.log('Unable to retrieve cart list form local storage.', e);
            }
        },

        settings_set(state, action: PayloadAction<CartSettings>) {
            state.settings.baseTax = roundNum2(action.payload.baseTax);
            state.settings.baseDiscount = roundNum2(action.payload.baseDiscount);
            state.settings.currency.primary.symbol = action.payload.currency.primary.symbol;
            state.settings.currency.secondary.rate = roundNum4(
                action.payload.currency.secondary.rate
            );
            state.settings.currency.secondary.symbol = action.payload.currency.secondary.symbol;

            try {
                localStorage.setItem('cart-settings', JSON.stringify(state.settings));
            } catch (e) {
                console.log('Unable to set settings to local storage.', e);
            }

            state.list.items.forEach((item) => {
                item.priceTotalSecondary = roundNum2(
                    item.priceTotal * state.settings.currency.secondary.rate
                );
            });
            state.list.total.priceSecondary = roundNum2(
                state.list.total.price * state.settings.currency.secondary.rate
            );
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
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
