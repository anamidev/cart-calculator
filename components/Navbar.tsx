import { SlCalculator, SlSettings } from 'react-icons/sl';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={'flex justify-between bg-lime-200 h-12'}>
            <Link
                href={'/'}
                className={'m-2'}
            >
                <SlCalculator className={'w-8 h-8 text-lime-600'} />
            </Link>
            <Link
                href={'/settings'}
                className={'m-2'}
            >
                <SlSettings className={'w-8 h-8 text-lime-600'} />
            </Link>
        </div>
    );
}
