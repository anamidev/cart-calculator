import {BsTrash} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {shopActions} from "@/redux/slices/shop";

export default function Cart_Item({item}) {
    const dispatch = useDispatch();
    const deleteItem = () => {
        dispatch(shopActions.deleteCartItem(item))
    }
    
    return (
        <div className={'grid grid-cols-8 gap-0.5 bg-lime-50 rounded-lg border-2 border-lime-100 mb-2'}>
            <button
                className={'col-span-1 row-span-2 p-1'}
                onClick={deleteItem}
            >
                <BsTrash className={'text-red-500 w-full h-6'}/>
            </button>
            <div className={'col-span-4 p-1'}>
                {item.item}
            </div>
            <div className={'col-span-3 p-1 text-right'}>
                {item.priceTotal}
            </div>
            <div className={'col-start-2 col-span-2 p-1 text-lime-600'}>
                D: -{item.discount}%
            </div>
            <div className={'col-span-2 p-1 text-yellow-600'}>
                T: +{item.tax}%
            </div>
            <div className={'col-span-3 p-1 text-right'}>
                x{item.quantity}
            </div>
        </div>
        // <div className={'grid grid-cols-7 gap-0.5'}>
        //     <button
        //         className={'col-span-1 row-span-2 p-1'}
        //         onClick={deleteItem}
        //     >
        //         <BsTrash className={'text-red-500'}/>
        //     </button>
        //     <div className={'col-span-3 p-1'}>
        //         {item.item}
        //     </div>
        //     <div className={'col-span-1 p-1'}>
        //         {item.quantity}
        //     </div>
        //     <div className={'col-span-2 p-1'}>
        //         {item.priceTotal}
        //     </div>
        //     <div className={'col-start-2 col-span-2 p-1'}>
        //         Tax: {item.tax}%
        //     </div>
        //     <div className={'col-span-2 p-1'}>
        //         Dc: {item.discount}%
        //     </div>
        // </div>
    )
}