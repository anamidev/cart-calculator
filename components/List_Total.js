import {useSelector} from "react-redux";

export default function List_Total() {
    const {total} = useSelector(state => state.cart.list);
    return (
        <div className={'p-2 grid grid-cols-8 gap-0.5'}>
            <div className={'col-span-1'}>
                Total:
            </div>
            <div className={'col-span-3 text-right'}>
                {total.items} item(s)
            </div>
            <div className={'col-span-4 text-right'}>
                {total.price}
            </div>
        </div>
    )
}