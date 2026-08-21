import type { TimelineTaskListItemProps } from "../type/appTypes/TimelineTaskListItemProps";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import PendingIcon from '@mui/icons-material/Pending';

export default function TimelineTaskListItem(props: TimelineTaskListItemProps) {
    return <>
        <div className="m-2 rounded-2xl row-span-2" style={{ backgroundColor: props.backgroundColor }}>
            {/* Title */}
            <Typography className="pl-4 pt-3" variant="h6">{props.textTitle}</Typography>
            

            {/* Display this if override set */}
            {props.textOverride ? <>
                <div className="flex flex-col p-6 pt-3 text-center">
                    <Typography variant="h6">{props.textOverride}</Typography>
                </div>


            {/* Display normal rows if no override set */}
            </>: <>
                <div className="flex flex-col p-6 pt-3">
                    {/* Top row */}
                    <div className="flex flex-row">
                        <PendingIcon className="text-gray-400 mr-2" fontSize="small"/>
                        <Typography className=" text-gray-600" variant="body2">
                                {props.textTop}
                            </Typography>
                    </div>
                    {/* Middle row */}
                    <div className="flex flex-row mt-1 mb-1">
                        <MoreVertIcon className="text-gray-400 mr-2"/>
                        <Typography variant="body1"><b>{props.textMiddle}</b></Typography>
                    </div>
                    {/* Bottom row */}
                    <div className="flex flex-row">
                        <PendingIcon className="text-gray-400 mr-2" fontSize="small"/>
                        <Typography className=" text-gray-600" variant="body2">
                                {props.textBottom}
                        </Typography>
                    </div>
                </div>
            </>}
        </div>
    </>
}