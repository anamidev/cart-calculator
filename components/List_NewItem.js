import {BsBagPlus} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "@/redux/slices/cart";
import {useRef} from "react";
import {roundNum2} from "@/utils/roundNum2";

export default function List_NewItem() {
    const formRef = useRef();
    const dispatch = useDispatch();
    const {settings} = useSelector(state => state.cart);
    
    const validateForm = (e) => {
        const {quantity, price, discount, tax} = e.target;
        if (isNaN(Number(price.value))) {
            e.target.price.focus();
            return false;
        }
        if (isNaN(Number(quantity.value))) {
            e.target.quantity.focus();
            return false;
        }
        if (isNaN(Number(discount.value))) {
            e.target.discount.focus();
            return false;
        }
        if (isNaN(Number(tax.value))) {
            e.target.tax.focus();
            return false;
        }
        return true;
    }
    const addItem = (e) => {
        e.preventDefault();
        const isValid = validateForm(e);
        if (isValid) {
            const {item, quantity, price, discount, tax} = e.target;
            dispatch(cartActions.list_addItem({
                item: item.value,
                quantity: roundNum2(quantity.value),
                price: roundNum2(price.value),
                discount: roundNum2(discount.value),
                tax: roundNum2(tax.value),
                id: Date.now()
            }));
            dispatch(cartActions.list_save());
            e.target.reset();
            e.target.item.focus();
        }
    }
    
    const nextInput = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            formRef.current.price.focus();
        }
    }
    
    const increaseQuantity = () => {
        formRef.current.quantity.focus();
        formRef.current.quantity.value = Number(formRef.current.quantity.value) + 1;
    }
    const decreaseQuantity = () => {
        formRef.current.quantity.focus();
        formRef.current.quantity.value = Number(formRef.current.quantity.value) - 1;
    }
    
    const increaseDiscount = () => {
        formRef.current.discount.focus();
        formRef.current.discount.value = Number(formRef.current.discount.value) + 1;
    }
    const decreaseDiscount = () => {
        formRef.current.discount.focus();
        formRef.current.discount.value = Number(formRef.current.discount.value) - 1;
    }
    
    const increaseTax = () => {
        formRef.current.tax.focus();
        formRef.current.tax.value = Number(formRef.current.tax.value) + 1;
    }
    const decreaseTax = () => {
        formRef.current.tax.focus();
        formRef.current.tax.value = Number(formRef.current.tax.value) - 1;
    }
    
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
                <div className={'col-span-4 p-1 text-lime-600'}>
                    - Discount %
                </div>
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
                <div className={'col-span-4 p-1 text-yellow-600'}>
                    + Tax %
                </div>
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
                    <BsBagPlus className={'m-auto'}/>
                </button>
            </div>
            
        </form>
    )
}