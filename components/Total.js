import {useSelector} from "react-redux";

export default function Total() {
    const {total} = useSelector(state => state.shop.cart);
    return (
        <div className={'px-4 pt-2 grid grid-cols-8 gap-0.5'}>
            <div className={'col-start-2 col-span-3 p-1'}>
                Total
            </div>
            <div className={'col-span-3 p-1 text-right'}>
                {total}
            </div>
        </div>
    )
}