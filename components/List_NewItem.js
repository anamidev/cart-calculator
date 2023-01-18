import {BsBagPlus} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "@/redux/slices/cart";
import {useRef} from "react";

export default function List_NewItem() {
    const formRef = useRef();
    const dispatch = useDispatch();
    const {settings} = useSelector(state => state.cart);
    
    const addItem = (e) => {
        e.preventDefault();
        const {item, quantity, price, discount, tax} = e.target;
        dispatch(cartActions.list_addItem({
            item: item.value,
            quantity: quantity.value,
            price: price.value,
            discount: discount.value,
            tax: tax.value,
            id: Date.now()
        }));
        e.target.reset();
        e.target.item.focus();
    }
    
    const increaseQuantity = () => {
        formRef.current.quantity.focus();
        formRef.current.quantity.value = Number(formRef.current.quantity.value) + 1;
    }
    const decreaseQuantity = () => {
        formRef.current.quantity.focus();
        if (formRef.current.quantity.valueAsNumber > 1) {
            formRef.current.quantity.value = Number(formRef.current.quantity.value) - 1;
        }
    }
    
    const increaseDiscount = () => {
        formRef.current.discount.focus();
        if (!formRef.current.discount.value) {
            formRef.current.discount.value = 1;
        } else if (formRef.current.discount.valueAsNumber < 100) {
            formRef.current.discount.value = Number(formRef.current.discount.value) + 1;
        }
    }
    const decreaseDiscount = () => {
        formRef.current.discount.focus();
        if (formRef.current.discount.valueAsNumber > 0) {
            formRef.current.discount.value = Number(formRef.current.discount.value) - 1;
        }
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
                />
                <input
                    type="number"
                    step={'0.01'}
                    name={'price'}
                    placeholder={'Price'}
                    className={'col-span-4 border-2 border-lime-200 rounded-lg p-1'}
                    enterKeyHint={'done'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={decreaseQuantity}
                >
                    -
                </button>
                <input
                    type="number"
                    step={1}
                    name={'quantity'}
                    min={1}
                    defaultValue={1}
                    placeholder={'Qty'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                    enterKeyHint={'done'}
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
                    type="number"
                    step={0.01}
                    name={'discount'}
                    min={0}
                    max={100}
                    defaultValue={settings.baseDiscount}
                    placeholder={'-D%'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                    enterKeyHint={'done'}
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
                    type="number"
                    step={0.01}
                    name={'tax'}
                    defaultValue={settings.baseTax}
                    placeholder={'+T%'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                    enterKeyHint={'done'}
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