import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, cartActions } from '@/redux/slices/cart';
import { RootState } from '@/redux/store';

interface List_Item_Props {
    item: CartItem;
}

export default function List_Item({ item }: List_Item_Props) {
    const { currency } = useSelector((state: RootState) => state.cart.settings);
    const dispatch = useDispatch();
    const deleteItem = () => {
        dispatch(cartActions.list_deleteItem(item));
        dispatch(cartActions.list_save());
    };

    return (
        <div
            className={
                'grid grid-cols-8 gap-0.5 bg-lime-50 rounded-lg border-2 border-lime-100 mb-2'
            }
        >
            <button
                className={'col-span-1 row-span-3 p-1 bg-red-100'}
                onClick={deleteItem}
            >
                <BsTrash className={'text-red-500 w-full h-6'} />
            </button>
            <div className={'col-span-4 p-1'}>{item.item}</div>
            <div className={'col-span-3 p-1 text-right'}>
                {item.priceTotal + ' ' + currency.primary.symbol}
            </div>
            {currency.secondary.rate !== 0 ? (
                <div className={'col-start-6 col-span-3 p-1 text-right text-neutral-400'}>
                    {item.priceTotalSecondary + ' ' + currency.secondary.symbol}
                </div>
            ) : null}
            <div className={'col-start-2 col-span-2 p-1 text-lime-600'}>D: -{item.discount}%</div>
            <div className={'col-span-2 p-1 text-yellow-600'}>T: +{item.tax}%</div>
            <div className={'col-span-3 p-1 text-right'}>x{item.quantity}</div>
        </div>
    );
}
