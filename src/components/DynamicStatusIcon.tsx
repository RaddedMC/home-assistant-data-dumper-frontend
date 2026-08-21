import { useEffect, useState } from "react";
import type { DynamicStatusIconProps, StatusIconProps, KeyedStatusIconPair } from "../type/appTypes/DynamicStatusIconProps";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export function StatusIcon(props: StatusIconProps) {
    return <>
        <ListItemAvatar sx={{color: props.avatarMainColor, background: props.avatarBackgroundColor}} className="rounded-full text-center pl-0 pr-0 pt-3 pb-3 mr-4">
            {props.avatar}
        </ListItemAvatar>
    </>
}

export function DynamicStatusIcon(props: DynamicStatusIconProps) {

    const [selectedIcon, setSelectedIcon] = useState<StatusIconProps>();

    useEffect(() => {
        // Find the icon pair whose key matches the selected string.
        const matchedPair = props.iconList.find(
            (pair): pair is KeyedStatusIconPair => pair[0] === props.selected
        );
        // If found, set the corresponding StatusIcon; otherwise clear.
        setSelectedIcon(matchedPair ? matchedPair[1] : undefined);
    }, [props.selected]);

    return selectedIcon ? <StatusIcon {...selectedIcon} /> : null;
}