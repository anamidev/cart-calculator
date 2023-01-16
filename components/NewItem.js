import {BsBagPlus} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {shopActions} from "@/redux/slices/shop";
import {useRef} from "react";

export default function NewItem() {
    const formRef = useRef();
    const dispatch = useDispatch();
    const {settings} = useSelector(state => state.shop);
    
    const addItem = (e) => {
        e.preventDefault();
        const {item, quantity, price, discount, tax} = e.target;
        dispatch(shopActions.addCartItem({
            item: item.value,
            quantity: quantity.value,
            price: price.value,
            discount: discount.value,
            tax: tax.value,
            id: Date.now()
        }));
        e.target.reset();
    }
    const icQty = () => {
        if (!formRef.current.quantity.value) {
            formRef.current.quantity.value = 2;
        } else {
            formRef.current.quantity.value = Number(formRef.current.quantity.value) + 1;
        }
    }
    const dcQty = () => {
        if (formRef.current.quantity.valueAsNumber > 1) {
            formRef.current.quantity.value = Number(formRef.current.quantity.value) - 1;
        }
    }
    const icDc = () => {
        if (!formRef.current.discount.value) {
            formRef.current.discount.value = 1;
        } else if (formRef.current.discount.valueAsNumber < 100) {
            formRef.current.discount.value = Number(formRef.current.discount.value) + 1;
        }
    }
    const dcDc = () => {
        if (formRef.current.discount.valueAsNumber > 0) {
            formRef.current.discount.value = Number(formRef.current.discount.value) - 1;
        }
    }
    const icTx = () => {
        formRef.current.tax.value = Number(formRef.current.tax.value) + 1;
    }
    const dcTx = () => {
        formRef.current.tax.value = Number(formRef.current.tax.value) - 1;
    }
    
    return (
        <form
            className={'flex flex-col items-center max-w-lg m-auto px-4 py-2'}
            onSubmit={addItem}
            ref={formRef}
        >
    
            <div className={'grid grid-cols-8 gap-0.5 p-2 bg-lime-100 w-full rounded-lg'}>
                <input
                    type="text"
                    name={'item'}
                    placeholder={'Item'}
                    className={'col-span-8 border-2 border-lime-200 rounded-lg p-1'}
                />
                <input
                    type="number"
                    name={'price'}
                    placeholder={'Price'}
                    className={'col-span-4 border-2 border-lime-200 rounded-lg p-1'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={dcQty}
                >
                    -
                </button>
                <input
                    type="number"
                    name={'quantity'}
                    min={1}
                    placeholder={'1'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={icQty}
                >
                    +
                </button>
                <div className={'col-span-4 p-1 text-lime-600'}>
                    - Discount %
                </div>
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={dcDc}
                >
                    -
                </button>
                <input
                    type="number"
                    name={'discount'}
                    min={0}
                    max={100}
                    placeholder={`${settings.discount}`}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={icDc}
                >
                    +
                </button>
                <div className={'col-span-4 p-1 text-yellow-600'}>
                    + Tax %
                </div>
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={dcTx}
                >
                    -
                </button>
                <input
                    type="number"
                    name={'tax'}
                    placeholder={`${settings.tax}`}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                />
                <button
                    className={'bg-lime-200 col-span-1 rounded-lg p-1'}
                    type={'button'}
                    onClick={icTx}
                >
                    +
                </button>
            </div>
            
            <div className={'pt-2'}>
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