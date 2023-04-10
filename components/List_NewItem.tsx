import { BsBagPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cart';
import React, { useRef } from 'react';
import { roundNum2 } from '@/utils/roundNum2';
import { RootState } from '@/redux/store';

export default function List_NewItem() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch();
    const { settings } = useSelector((state: RootState) => state.cart);

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        const quantity = e.currentTarget.quantity as HTMLInputElement;
        const price = e.currentTarget.price as HTMLInputElement;
        const discount = e.currentTarget.discount as HTMLInputElement;
        const tax = e.currentTarget.tax as HTMLInputElement;
        if (isNaN(Number(price.value))) {
            price.focus();
            return false;
        }
        if (isNaN(Number(quantity.value))) {
            quantity.focus();
            return false;
        }
        if (isNaN(Number(discount.value))) {
            discount.focus();
            return false;
        }
        if (isNaN(Number(tax.value))) {
            tax.focus();
            return false;
        }
        return true;
    };

    const addItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm(e);
        if (isValid) {
            const item = (e.currentTarget.item as HTMLInputElement).value || 'Cart item';
            const quantity = (e.currentTarget.quantity as HTMLInputElement).value as unknown as number;
            const price = (e.currentTarget.price as HTMLInputElement).value as unknown as number;
            const discount = (e.currentTarget.discount as HTMLInputElement).value as unknown as number;
            const tax = (e.currentTarget.tax as HTMLInputElement).value as unknown as number;
            const priceTotal = roundNum2((price - ((price * discount) / 100) + ((price * tax) / 100)) * quantity);
            const priceTotalSecondary = roundNum2(priceTotal * settings.currency.secondary.rate);
            dispatch(
                cartActions.list_addItem({
                    id: Date.now(),
                    item,
                    quantity: roundNum2(Number(quantity)),
                    price: roundNum2(Number(price)),
                    discount: roundNum2(Number(discount)),
                    tax: roundNum2(Number(tax)),
                    priceTotal,
                    priceTotalSecondary,
                })
            );
            dispatch(cartActions.list_save());
            e.currentTarget.reset();
            e.currentTarget.item.focus();
        }
    };

    const nextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && formRef.current) {
            e.preventDefault();
            formRef.current.price.focus();
        }
    };

    const increaseQuantity = () => {
        if (formRef.current) {
            formRef.current.quantity.focus();
            formRef.current.quantity.value = Number(formRef.current.quantity.value) + 1;
        }
    };
    const decreaseQuantity = () => {
        if (formRef.current) {
            formRef.current.quantity.focus();
            formRef.current.quantity.value = Number(formRef.current.quantity.value) - 1;
        }
    };

    const increaseDiscount = () => {
        if (formRef.current) {
            formRef.current.discount.focus();
            formRef.current.discount.value = Number(formRef.current.discount.value) + 1;
        }
    };
    const decreaseDiscount = () => {
        if (formRef.current) {
            formRef.current.discount.focus();
            formRef.current.discount.value = Number(formRef.current.discount.value) - 1;
        }
    };

    const increaseTax = () => {
        if (formRef.current) {
            formRef.current.tax.focus();
            formRef.current.tax.value = Number(formRef.current.tax.value) + 1;
        }
    };
    const decreaseTax = () => {
        if (formRef.current) {
            formRef.current.tax.focus();
        formRef.current.tax.value = Number(formRef.current.tax.value) - 1;
        }
    };

    return (
        <form
            className={'flex flex-col items-center'}
            onSubmit={addItem}
            ref={formRef}
        >
            <div className={'grid grid-cols-8 gap-0.5 p-2 bg-lime-100 w-full rounded-lg'}>
                <input
                    type="text"
                    name={'item'}
                    placeholder={'Item'}
                    className={'col-span-8 border-2 border-lime-200 rounded-lg p-1'}
                    enterKeyHint={'next'}
                    onKeyDown={nextInput}
                />
                <input
                    type="text"
                    name={'price'}
                    inputMode={'decimal'}
                    placeholder={`Price ${settings.currency.primary.symbol}`}
                    className={'col-span-4 border-2 border-lime-200 rounded-lg p-1'}
                    enterKeyHint={'go'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={decreaseQuantity}
                >
                    -
                </button>
                <input
                    type="text"
                    name={'quantity'}
                    inputMode={'decimal'}
                    defaultValue={1}
                    placeholder={'Qty'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                    enterKeyHint={'go'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={increaseQuantity}
                >
                    +
                </button>
                <div className={'col-span-4 p-1 text-lime-600'}>- Discount %</div>
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={decreaseDiscount}
                >
                    -
                </button>
                <input
                    type="text"
                    name={'discount'}
                    inputMode={'decimal'}
                    defaultValue={settings.baseDiscount}
                    placeholder={'-D%'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                    enterKeyHint={'go'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={increaseDiscount}
                >
                    +
                </button>
                <div className={'col-span-4 p-1 text-yellow-600'}>+ Tax %</div>
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={decreaseTax}
                >
                    -
                </button>
                <input
                    type="text"
                    name={'tax'}
                    inputMode={'decimal'}
                    defaultValue={settings.baseTax}
                    placeholder={'+T%'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                    enterKeyHint={'go'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={increaseTax}
                >
                    +
                </button>
            </div>

            <div className={'py-2 hidden'}>
                <button
                    className={'w-16 h-10 bg-lime-300 rounded-full'}
                    type={'submit'}
                >
                    <BsBagPlus className={'m-auto'} />
                </button>
            </div>
        </form>
    );
}
