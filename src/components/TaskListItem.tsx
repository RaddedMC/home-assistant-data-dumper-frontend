import { type DynamicIconListItemProps, type ListItemProps } from "../type/appTypes/ListItemProps";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DynamicStatusIcon, StatusIcon } from "./DynamicStatusIcon";

export function DynamicIconTaskListItem(props: DynamicIconListItemProps) {
    return <>
        <div className="m-2">
            <ListItem className="rounded-2xl" sx={{backgroundColor: props.backgroundColor}}>
                <DynamicStatusIcon {...props.dynamicStatusIcon} />
                <ListItemText primary={props.textPrimary} secondary={props.textSecondary} />
            </ListItem>
        </div>
    </>
}

export default function TaskListItem(props: ListItemProps) {
    return <>
        <div className="m-2">
            <ListItem className="rounded-2xl" sx={{backgroundColor: props.backgroundColor}}>
                <StatusIcon {...props.statusIcon}/>
                <ListItemText primary={props.textPrimary} secondary={props.textSecondary} />
            </ListItem>    
        </div>
    </>
}