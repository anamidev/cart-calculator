import List_NewItem from "@/components/List_NewItem";
import List_Total from "@/components/List_Total";

export default function List_Header() {
    return (
        <div className={'p-2 bg-white w-full border-b-2 border-dashed border-b-lime-300'}>
            <List_NewItem/>
            <List_Total/>
        </div>
    )
}
