import NewItem from "@/components/NewItem";
import Total from "@/components/Total";

export default function Footer() {
    return (
        <div className={'bg-white w-full border-t-2 border-dashed border-t-lime-300 '}>
            <Total/>
            <NewItem/>
        </div>
    )
}
