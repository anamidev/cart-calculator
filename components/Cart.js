import {useSelector} from "react-redux";
import Cart_Item from "@/components/Cart_Item";

export default function Cart() {
    const {items} = useSelector(state => state.shop.cart);
    
    return (
        <div className={'flex flex-col-reverse'}>
            {items.map(item => <Cart_Item key={item.id} item={item}/>)}
        </div>
    )
}