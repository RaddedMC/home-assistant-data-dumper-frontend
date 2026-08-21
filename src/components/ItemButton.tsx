import type { ItemButtonProps } from "../type/appTypes/ItemButtonProps";
import { StatusIcon } from "./DynamicStatusIcon";

export default function ItemButton(props: ItemButtonProps) {
    return <div className="m-2">
        {/* Outer wrapper for layout */}
            <div className="border-4 rounded-2xl flex p-2 px-4 transition duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95" style={{backgroundColor: props.colour, borderColor: "#00000011"}} onClick={props.callback}>
            <div className="flex flex-row items-center">
                <StatusIcon {...props.statusIcon}/>
                <p className="text-lg">{props.text}</p>
            </div>
        </div>
    </div>
}