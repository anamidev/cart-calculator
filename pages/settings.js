import {useDispatch, useSelector} from "react-redux";
import {SlCheck, SlRefresh} from "react-icons/sl";
import {cartActions} from "@/redux/slices/cart";
import {roundNum} from "@/utils/roundNum";
import {useState} from "react";

export default function Settings() {
    const [isSaved, setIsSaved] = useState(false);
    const {settings} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    
    const validateForm = (e) => {
        const {baseDiscount, baseTax, secondaryRate} = e.target;
        if (isNaN(Number(baseDiscount.value))) {
            e.target.baseDiscount.focus();
            return false;
        }
        if (isNaN(Number(baseTax.value))) {
            e.target.baseTax.focus();
            return false;
        }
        if (isNaN(Number(secondaryRate.value))) {
            e.target.secondaryRate.focus();
            return false;
        }
        return true;
    }
    const limitSymbolValue = (e) => {
        if (e.target.value.length > 3) {
            e.target.value = e.target.value.slice(0,3);
        }
    }
    
    const saveSettings = (e) => {
        e.preventDefault();
        const isValid = validateForm(e);
        if (isValid) {
            const {baseDiscount, baseTax, primarySymbol, secondaryRate, secondarySymbol} = e.target;
            const newSettings = {
                baseDiscount: roundNum(baseDiscount.value),
                baseTax: roundNum(baseTax.value),
                primarySymbol: primarySymbol.value,
                secondaryRate: roundNum(secondaryRate.value),
                secondarySymbol: secondarySymbol.value,
            };
            dispatch(cartActions.settings_set(newSettings))
            setIsSaved(true);
        }
    }
    
    return (
        <form
            className={'p-2 grid grid-cols-8 gap-0.5'}
            onSubmit={saveSettings}
        >
            <div className={'col-start-2 col-span-3 text-lime-600'}>
                Base discount -%
            </div>
            <input
                name={'baseDiscount'}
                className={'col-start-6 col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                defaultValue={settings.baseDiscount}
                placeholder={'-D%'}
            />
            <div className={'col-start-2 col-span-3 text-yellow-600'}>
                Base tax +%
            </div>
            <input
                name={'baseTax'}
                className={'col-start-6 col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                defaultValue={settings.baseTax}
                placeholder={'+T%'}
            />
            
            <div className={'col-start-3 col-span-4 my-2 text-center'}>
                Currencies
            </div>
            <div className={'col-start-2 col-span-2'}>
                Primary
            </div>
            <input
                name={'primaryRate'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                value={settings.currency.primary.rate}
                placeholder={'Rate'}
                readOnly={true}
            />
            <input
                name={'primarySymbol'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                placeholder={'Symbol'}
                onChange={limitSymbolValue}
                defaultValue={settings.currency.primary.symbol}
            />
            <div className={'col-start-2 col-span-2'}>
                Secondary
            </div>
            <input
                name={'secondaryRate'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                defaultValue={settings.currency.secondary.rate}
                placeholder={'Rate'}
            />
            <input
                name={'secondarySymbol'}
                className={'col-span-2 border-2 border-lime-200 rounded-lg p-1 text-center'}
                placeholder={'Symbol'}
                defaultValue={settings.currency.secondary.symbol}
                onChange={limitSymbolValue}
            />
            
            <button
                type={'submit'}
                className={'col-start-4 col-span-2 my-2 bg-lime-200 rounded-lg p-1'}
            >
                {
                    isSaved
                        ? <SlCheck className={'inline w-6 h-6 text-lime-600'}/>
                        : <SlRefresh className={'inline w-6 h-6 text-lime-600'}/>
                }
            </button>
        </form>
    )
}