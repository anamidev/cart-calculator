import { useSelector } from 'react-redux';
import List_Item from '@/components/List_Item';
import { RootState } from '@/redux/store';

export default function List() {
    const { items } = useSelector((state: RootState) => state.cart.list);

    return (
        <div className={'p-2 grow overflow-auto'}>
            {items.map((item) => (
                <List_Item
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
}
