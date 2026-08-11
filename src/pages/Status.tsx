import ExportButton from "../components/ExportButton";
import {
    List,
    Typography
} from "@mui/material";
import TaskListItem from "../components/TaskListItem";
import { type SchedulerAPIResponse, type WorkerAPIResponse, type SchedulerEntry, type WorkerTask, type WorkerStatus } from "../type/externalTypes/AddonWorkerTypes";
import { type DBInfoAPIResponse } from "../type/externalTypes/DBInfoTypes";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Skeleton } from "@mui/material";

/* Icons needed:
 * - Running : LoopIcon
 * - Idle : PendingIcon
 * - Not started : ModeStandbyIcon
 * - Shut down : PowerSettingsNew
 * - Failed : ReportProblem
 * - Scheduled : CalendarMonth
 * - Completed : CheckCircle
*/
import LoopIcon from '@mui/icons-material/Loop';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import PendingIcon from '@mui/icons-material/Pending';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { MobileProps } from "../type/appTypes/MobileProps";
import { useEffect, useState } from "react";
import type { JSX } from "react";

export default function Status(props: MobileProps) {
    // -- States -- //
    // Data
    const [schedule, setSchedule] = useState<SchedulerAPIResponse | undefined>(undefined);
    const [worker, setWorker] = useState<WorkerAPIResponse | undefined>(undefined);
    const [dbInfo, setDbInfo] = useState<DBInfoAPIResponse | undefined>(undefined);
    // Elements
    const [scheduleElements, setScheduleElements] = useState<JSX.Element[] | undefined>(undefined);
    const [workerElements, setWorkerElements] = useState<JSX.Element[] | undefined>(undefined);
    const [systemStatusElements, setSystemStatusElements] = useState<JSX.Element | undefined>(undefined);
    // Page state
    const [isLoading, setLoading] = useState(true);

    // -- Function to build elements for entries -- //
    const buildScheduleEntry = (entry: SchedulerEntry) => <TaskListItem
        avatar={<CalendarMonthIcon/>}
        textPrimary={entry.task.type + " : " + entry.task.title}
        textSecondary={"will run at " + entry.queue_time + (entry.daily ? ", repeating daily" : "")} avatarMainColor={"black"} avatarBackgroundColor={"#dddddd"}
    />;
    const buildWorkerEntry = (entry: WorkerTask) => <TaskListItem
        avatar={
            entry.status == "TaskState.COMPLETED" ? <CheckCircleIcon/> :
            entry.status == "TaskState.FAILED" ? <ReportProblemIcon/> :
            entry.status == "TaskState.NOT_STARTED" ? <PendingIcon/> :
            entry.status == "TaskState.RUNNING" ? <LoopIcon/> 
            : <></>
        }
        textPrimary={entry.type + " : " + entry.title}
        textSecondary={entry.status == "TaskState.FAILED" ? (entry.error ? entry.error : "") : entry.description}
        avatarMainColor={
            entry.status == "TaskState.COMPLETED" ? "#00aa00" :
            entry.status == "TaskState.FAILED" ? "#aa0000" :
            entry.status == "TaskState.NOT_STARTED" ? "#aaaaaa" :
            entry.status == "TaskState.RUNNING" ? "black" 
            : "white"
        }
        avatarBackgroundColor={
            entry.status == "TaskState.COMPLETED" ? "#aaffaa" :
            entry.status == "TaskState.FAILED" ? "#ffaaaa" :
            entry.status == "TaskState.NOT_STARTED" ? "#dddddd" :
            entry.status == "TaskState.RUNNING" ? "#bbbbbb" 
            : "white"
        }
    />;
    // TODO: This could be a TaskListItem, I just need to parametrize the background of the whole TaskListItem
    // TODO: I need to make it easier to organize the UI, rather than editing skeleton and page and setting spacing manually
    const buildSystemStatus = (status: WorkerStatus, dbInfoLocal: DBInfoAPIResponse) => <>
        {/* TODO: Margins here need some work */}
        {/* TaskWorker Status */}
        <ListItem className=" bg-slate-200 rounded-2xl mt-2" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}>
            <ListItemAvatar sx={{
                color:
                    status == "WorkerState.IDLE" ? "black" :
                    status == "WorkerState.NOT_STARTED" ? "#aaaaaa" :
                    status == "WorkerState.RUNNING" ? "#00aa00" :
                    status == "WorkerState.SHUT_DOWN" ? "#aa0000" : ""
                ,
                background:
                    status == "WorkerState.IDLE" ? "#bbbbbb" :
                    status == "WorkerState.NOT_STARTED" ? "#dddddd" :
                    status == "WorkerState.RUNNING" ? "#aaffaa" :
                    status == "WorkerState.SHUT_DOWN" ? "#ffaaaa" : ""
            }} className="rounded-full text-center pl-0 pr-0 pt-3 pb-3 mr-4">
                {
                    status == "WorkerState.IDLE" ? <ModeStandbyIcon/> :
                    status == "WorkerState.NOT_STARTED" ? <PendingIcon/> :
                    status == "WorkerState.RUNNING" ? <LoopIcon/> :
                    status == "WorkerState.SHUT_DOWN" ? <PowerSettingsNewIcon/> : <></>
                }
            </ListItemAvatar>
            <ListItemText primary={"System is " + (
                    status == "WorkerState.IDLE" ? "Idle" :
                    status == "WorkerState.NOT_STARTED" ? "Not running" :
                    status == "WorkerState.RUNNING" ? "Running" :
                    status == "WorkerState.SHUT_DOWN" ? "Shutting down" : ""
                )
            } secondary={
                status == "WorkerState.IDLE" ? "No tasks are currently active" :
                status == "WorkerState.NOT_STARTED" ? "The addon is still starting up" :
                status == "WorkerState.RUNNING" ? "The addon is completing a task" :
                status == "WorkerState.SHUT_DOWN" ? "The addon was shut down" : ""
            } />
        </ListItem>
        {/* Database entry count */}
        <ListItem className=" bg-slate-200 rounded-2xl mt-2" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}>
            <ListItemAvatar sx={{color: "#aaaaaa", background: "#dddddd"}} className="rounded-full text-center pl-0 pr-0 pt-3 pb-3 mr-4" >
                <PendingIcon/>
            </ListItemAvatar>
            <ListItemText primary={dbInfoLocal.entry_count} secondary="Logbook entries dumped"/>
        </ListItem>
        {/* Newest entry time */}
        <ListItem className=" bg-slate-200 rounded-2xl mt-2" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}>
            <ListItemAvatar sx={{color: "#aaaaaa", background: "#dddddd"}} className="rounded-full text-center pl-0 pr-0 pt-3 pb-3 mr-4" >
                <PendingIcon/>
            </ListItemAvatar>
            {/* TODO: Convert ISO time into a more readable time format here */}
            <ListItemText primary={dbInfoLocal.newest_entry_time} secondary="Newest logbook entry"/> 
        </ListItem>
        {/* Oldest entry time */}
        <ListItem className=" bg-slate-200 rounded-2xl mt-2" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}>
            <ListItemAvatar sx={{color: "#aaaaaa", background: "#dddddd"}} className="rounded-full text-center pl-0 pr-0 pt-3 pb-3 mr-4" >
                <PendingIcon/>
            </ListItemAvatar>
            {/* TODO: Convert ISO time into a more readable time format here */}
            <ListItemText primary={dbInfoLocal.oldest_entry_time} secondary="Newest logbook entry"/> 
        </ListItem>
        {/* Database lock indicator */}
        <ListItem className=" bg-slate-200 rounded-2xl mt-2" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}>
            <ListItemAvatar sx={{
                    color:
                        dbInfoLocal.is_unlocked ? "#00aa00" : "#aa0000"
                    ,
                    background:
                        dbInfoLocal.is_unlocked ? "#aaffaa" : "#ffaaaa"
                }} className="rounded-full text-center pl-0 pr-0 pt-3 pb-3 mr-4" >
                {dbInfoLocal.is_unlocked ? <CheckCircleIcon/> : <ReportProblemIcon/>}
            </ListItemAvatar>
            <ListItemText primary={
                dbInfoLocal.is_unlocked ? "Database is UNLOCKED" : "Database is LOCKED"
            } secondary={
                dbInfoLocal.is_unlocked ? "" : "If like this for a while, the app likely crashed"
            }/>
        </ListItem>
    </>
    ;

    // -- Function to update page content on change of state -- //
    useEffect(() => {
        if (!isLoading) {
            console.log("Data loaded!");
        }
        setScheduleElements(schedule?.schedule.map(buildScheduleEntry));
        setWorkerElements(worker?.tasks.map(buildWorkerEntry));
        if (worker !== undefined && dbInfo !== undefined) setSystemStatusElements(buildSystemStatus(worker.status, dbInfo));
    }, [isLoading])

    // -- Obtain data from addon API -- //
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(true); // TODO: Changing loading to True/False causes flickering, but not using it prevents the page from updating
            Promise.all([
                // Fetch schedule
                fetch("/api/worker/schedule")
                    .then((response) => response.json())
                    .then((data: SchedulerAPIResponse) => {
                        console.log(data);
                        setSchedule(data);
                    })
                    .catch((err) => {
                        console.error(err.message);
                    }),
                // Fetch worker
                fetch("/api/worker/tasks")
                    .then((response) => response.json())
                    .then((data: WorkerAPIResponse) => {
                        console.log(data);
                        setWorker(data);
                    })
                    .catch((err) => {
                        console.error(err.message);
                    }),
                // Fetch db status
                fetch("/api/db/info")
                    .then((response) => response.json())
                    .then((data: DBInfoAPIResponse) => {
                        console.log(data);
                        setDbInfo(data);
                    })
                    .catch((err) => {
                        console.error(err.message);
                    })
            ])  
            // Unset loading when schedule and worker data ready
                .then(() => {setLoading(false)});
                // TODO: a websocket could be used instead of this refreshing
        }, 1000); // Repeat every second

        return () => clearInterval(interval);
    }, []);

    // Page content
    return (
        
        isLoading
        // Loader if page is still loading
        ? <>
            {/* System Status */}
            {/* TODO: Margins here need some work */}
            <div className={props.isMobile ? "" : "grid grid-cols-2 grid-rows-2"}> {/* TODO: Same as below with tablet view */}
                {/* TaskWorker Status */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}/>

                {/* DB Entry Count */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}/>

                {/* DB Newest Entry Time */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}/>

                {/* DB Oldest Entry Time */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}/>

                {/* DB Lock status */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}/>
            </div>
            {/* Mobile UI splitter*/}
            <div className={props.isMobile ? "" : "flex flex-row"}> {/* TODO: Same as below with tablet view */}
                {/* Task queue */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4"/>

                {/* Schedule */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginLeft: (props.isMobile ? "0" : "1rem")}}/>
            </div>

        </> :
        scheduleElements == null || workerElements == null || systemStatusElements == null ?
        // Error if the page fails to load
        // TODO: Error does not appear if the data fails to load during a refresh
        <>
            <div className="flex h-full w-full items-center justify-center">
                <div className=" flex bg-slate-200 rounded-2xl p-4">
                    <ReportProblemIcon className="mr-4"/>
                    <Typography>There was an error loading system status. Check console.</Typography>
                </div>
            </div>
        </>

        // Actual page
        : <>
            {/* System status */}
            <div className={props.isMobile ? "" : "grid grid-cols-2 grid-rows-2"}>
                {systemStatusElements}
            </div>            

            {/* Mobile UI splitter*/}
            {/* TODO: Scroll on overflow (tablet only) */}
            {/* TODO: The tablet view can get a little squishy when the sidebar is open */}
            <div className={props.isMobile ? "" : "flex flex-row"}>
                {/* Task queue */}
                <div className="bg-slate-200 rounded-2xl w-full mt-2 p-4">
                    <Typography variant="h5">Task Queue</Typography>
                    <List>
                        {workerElements}
                    </List>
                </div>

                {/* Schedule */}
                <div className="bg-slate-200 rounded-2xl w-full mt-2 p-4" style={{marginLeft: (props.isMobile ? "0" : "1rem")}}>
                    <Typography variant="h5">Schedule</Typography>
                    <List>
                        {scheduleElements}
                    </List>
                </div>
            </div>
            <ExportButton/>
        </>
    )
}