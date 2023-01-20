import Navbar from "@/components/Navbar";
import {useDispatch} from "react-redux";
import {cartActions} from "@/redux/slices/cart";
import {useEffect} from "react";

export default function Layout({children}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cartActions.settings_get());
    }, [dispatch])
    
    return (
        <div className={'max-w-md max-h-screen mx-auto'}>
            <div className={'relative z-10'}>
                <Navbar/>
            </div>
            <main className={'px-2 pb-2 pt-12 flex flex-col h-screen relative -top-12'}>
                {children}
            </main>
        </div>
    )
}