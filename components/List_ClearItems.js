import {BsCartX} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {cartActions} from "@/redux/slices/cart";

export default function List_ClearItems() {
    const dispatch = useDispatch();
    
    const clearCart = () => {
        dispatch(cartActions.list_deleteAllItems());
        dispatch(cartActions.list_save());
    }
    
    return (
        <button
            className={'w-full h-9 bg-red-100 text-red-500 rounded-lg border-2 border-red-200'}
            onClick={clearCart}
        >
            <BsCartX className={'w-6 h-6 inline'}/>
            Clear cart
        </button>
    )
}