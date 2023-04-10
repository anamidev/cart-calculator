import { useSelector } from 'react-redux';
import List_ClearItems from '@/components/List_ClearItems';
import { RootState } from '@/redux/store';

export default function List_Total() {
    const { total } = useSelector((state: RootState) => state.cart.list);
    const { currency } = useSelector((state: RootState) => state.cart.settings);
    return (
        <div className={'p-2 grid grid-cols-8 gap-0.5'}>
            <div className={'col-span-1'}>Total:</div>
            <div className={'col-span-3 text-right'}>{total.items} item(s)</div>
            <div className={'col-span-4 text-right'}>
                {total.price + ' ' + currency.primary.symbol}
            </div>
            {currency.secondary.rate !== 0 ? (
                <div className={'col-start-5 col-span-4 text-right text-neutral-400'}>
                    {total.priceSecondary + ' ' + currency.secondary.symbol}
                </div>
            ) : null}
            <div className={'col-start-3 col-span-4'}>
                <List_ClearItems />
            </div>
        </div>
    );
}
