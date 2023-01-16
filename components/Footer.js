import NewItem from "@/components/NewItem";
import Total from "@/components/Total";

export default function Footer() {
    return (
        <div className={'fixed bottom-0 left-0 bg-white w-full'}>
            <div className={'max-w-lg mx-auto'}>
                <Total/>
                <NewItem/>
            </div>
        </div>
    )
}
