import { useDispatch, useSelector } from 'react-redux';
import { SlCheck, SlRefresh } from 'react-icons/sl';
import { cartActions, CartSettings } from '@/redux/slices/cart';
import { roundNum2, roundNum8 } from '@/utils/roundNum2';
import React, { useState } from 'react';
import { RootState } from '@/redux/store';

export default function Settings() {
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const { settings } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        const baseDiscount = e.currentTarget.baseDiscount as HTMLInputElement;
        const baseTax = e.currentTarget.baseTax as HTMLInputElement;
        const secondaryRate = e.currentTarget.secondaryRate as HTMLInputElement;

        if (isNaN(Number(baseDiscount.value))) {
            baseDiscount.focus();
            return false;
        }
        if (isNaN(Number(baseTax.value))) {
            baseTax.focus();
            return false;
        }
        if (isNaN(Number(secondaryRate.value))) {
            secondaryRate.focus();
            return false;
        }
        return true;
    };
    const limitSymbolValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 3) {
            e.currentTarget.value = e.currentTarget.value.slice(0, 3);
        }
    };

    const saveSettings = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm(e);
        if (isValid) {
            const baseDiscount = e.currentTarget.baseDiscount as HTMLInputElement;
            const baseTax = e.currentTarget.baseTax as HTMLInputElement;
            const primarySymbol = e.currentTarget.primarySymbol as HTMLInputElement;
            const secondaryRate = e.currentTarget.secondaryRate as HTMLInputElement;
            const secondarySymbol = e.currentTarget.secondarySymbol as HTMLInputElement;

            const newSettings: CartSettings = {
                baseDiscount: roundNum2(Number(baseDiscount.value)),
                baseTax: roundNum2(Number(baseTax.value)),
                currency: {
                    primary: {
                        rate: 1,
                        symbol: primarySymbol.value,
                    },
                    secondary: {
                        rate: roundNum8(Number(secondaryRate.value)),
                        symbol: secondarySymbol.value,
                    },
                },
            };
            dispatch(cartActions.settings_set(newSettings));
            setIsSaved(true);
        }
    };

    return (
        <form
            className={'p-2 grid grid-cols-8 gap-0.5'}
            onSubmit={saveSettings}
        >
            <div className={'col-start-2 col-span-3 text-lime-600'}>Base discount -%</div>
            <input
                name={'baseDiscount'}
                className={
                    'col-start-6 col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'
                }
                defaultValue={settings.baseDiscount}
                placeholder={'-D%'}
            />
            <div className={'col-start-2 col-span-3 text-yellow-600'}>Base tax +%</div>
            <input
                name={'baseTax'}
                className={
                    'col-start-6 col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'
                }
                defaultValue={settings.baseTax}
                placeholder={'+T%'}
            />

            <div className={'col-start-3 col-span-4 my-2 text-center'}>Currencies</div>
            <div className={'col-start-2 col-span-2'}>Primary</div>
            <input
                name={'primaryRate'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                value={settings.currency.primary.rate}
                placeholder={'Rate'}
                readOnly={true}
            />
            <input
                name={'primarySymbol'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                placeholder={'Symbol'}
                onChange={limitSymbolValue}
                defaultValue={settings.currency.primary.symbol}
            />
            <div className={'col-start-2 col-span-2'}>Secondary</div>
            <input
                name={'secondaryRate'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                defaultValue={settings.currency.secondary.rate}
                placeholder={'Rate'}
            />
            <input
                name={'secondarySymbol'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                placeholder={'Symbol'}
                defaultValue={settings.currency.secondary.symbol}
                onChange={limitSymbolValue}
            />

            <button
                type={'submit'}
                className={'col-start-4 col-span-2 my-2 bg-lime-200 rounded-lg p-1'}
            >
                {isSaved ? (
                    <SlCheck className={'inline w-6 h-6 text-lime-600'} />
                ) : (
                    <SlRefresh className={'inline w-6 h-6 text-lime-600'} />
                )}
            </button>
        </form>
    );
}
