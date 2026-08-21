import type { ItemButtonProps } from "../type/appTypes/ItemButtonProps";
import Button from '@mui/material/Button';


export default function ItemButton(props: ItemButtonProps) {
    return <Button onClick={props.callback} sx={{backgroundColor: props.colour}}>
        {props.text}
    </Button>
}