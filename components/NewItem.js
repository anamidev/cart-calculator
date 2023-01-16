import {BsBagPlus} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {shopActions} from "@/redux/slices/shop";

export default function NewItem() {
    const dispatch = useDispatch();
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
    
    return (
        <form
            className={'flex flex-col items-center max-w-lg m-auto p-4'}
            onSubmit={addItem}
        >
            <div className={'grid grid-cols-6 gap-0.5 p-4 bg-lime-100 w-full rounded-lg'}>
                <input
                    type="text"
                    name={'item'}
                    placeholder={'Item'}
                    className={'col-span-3 border-2 border-lime-200 rounded-lg p-1 text-xl'}
                />
                <input
                    type="number"
                    name={'quantity'}
                    placeholder={'Qty'}
                    className={'col-span-1 border-2 border-lime-200 rounded-lg p-1 text-xl'}
                />
                <input
                    type="number"
                    name={'price'}
                    placeholder={'Price'}
                    className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-xl'}
                />
                <input
                    type="number"
                    name={'discount'}
                    placeholder={'Dc%'}
                    className={'col-start-5 col-span-1 border-2 border-lime-200 rounded-lg p-1 text-xl'}
                />
                <input
                    type="number"
                    name={'tax'}
                    placeholder={'Tax%'}
                    className={'col-span-1 border-2 border-lime-200 rounded-lg p-1 text-xl'}
                />
            </div>
            <button
                className={'w-14 h-10 mt-4 bg-lime-300 rounded-full'}
                type={'submit'}
            >
                <BsBagPlus className={'m-auto'}/>
            </button>
        </form>
    )
}