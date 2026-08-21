import type { ItemButtonProps } from "../type/appTypes/ItemButtonProps";
import Button from '@mui/material/Button';
import { StatusIcon } from "./DynamicStatusIcon";

export default function ItemButton(props: ItemButtonProps) {
    return <div>
        <Button onClick={props.callback} color="primary" sx={{backgroundColor: props.colour}}>
            <StatusIcon {...props.statusIcon}/>
        {props.text}
        </Button>
    </div>
}