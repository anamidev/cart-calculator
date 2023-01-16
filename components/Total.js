import {useSelector} from "react-redux";

export default function Total() {
    const {total} = useSelector(state => state.shop.cart);
    return (
        <div className={'p-4 grid grid-cols-7 gap-0.5'}>
            <div className={'col-start-2 col-span-4 p-1'}>
                Total
            </div>
            <div className={'col-span-2 p-1'}>
                {total}
            </div>
        </div>
    )
}