import {BsTrash} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {shopActions} from "@/redux/slices/shop";

export default function Cart_Item({item}) {
    const dispatch = useDispatch();
    const deleteItem = () => {
        dispatch(shopActions.deleteCartItem(item))
    }
    
    return (
        <div className={'p-4 grid grid-cols-7 gap-0.5'}>
            <button
                className={'col-span-1 row-span-2 p-1'}
                onClick={deleteItem}
            >
                <BsTrash className={'text-red-500'}/>
            </button>
            <div className={'col-span-3 p-1'}>
                {item.item}
            </div>
            <div className={'col-span-1 p-1'}>
                {item.quantity}
            </div>
            <div className={'col-span-2 p-1'}>
                {item.priceTotal}
            </div>
            <div className={'col-start-2 col-span-2 p-1'}>
                Tax: {item.tax}%
            </div>
            <div className={'col-span-2 p-1'}>
                Dc: {item.discount}%
            </div>
        </div>
    )
}