import ExportButton from "../components/ExportButton";
import {
    List,
    Typography
} from "@mui/material";
import TaskListItem, { DynamicIconTaskListItem } from "../components/TaskListItem";
import { type SchedulerAPIResponse, type WorkerAPIResponse, type SchedulerEntry, type WorkerTask, type WorkerStatus, type DBInfoAPIResponse } from "../type/externalTypes/AddonWorkerTypes";
import TimelineTaskListItem from "../components/TimelineTaskListItem";
import ItemButton from "../components/ItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Skeleton } from "@mui/material";
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
import { SelectiveText } from "../components/SelectiveText";

// Sample data for initial rendering
const sampleSchedule: SchedulerAPIResponse = {
    schedule: [
        {
            task: {
                type: "Backup",
                title: "Daily Backup",
                status: "TaskState.COMPLETED",
                description: "Backup completed successfully",
                error: undefined
            },
            queue_time: "2026-08-21T02:00:00Z",
            daily: true
        },
        {
            task: {
                type: "Fart",
                title: "I farted",
                status: "TaskState.FAILED",
                description: "asdf",
                error: "oopsie"
            },
            queue_time: "2026-08-21T02:00:00Z",
            daily: true
        },
        {
            task: {
                type: "Slow",
                title: "sloth",
                status: "TaskState.RUNNING",
                description: "this is taking forever",
                error: undefined
            },
            queue_time: "2026-08-21T02:00:00Z",
            daily: true
        },
        {
            task: {
                type: "Waiting",
                title: "impatient",
                status: "TaskState.NOT_STARTED",
                description: "I want to go now!!!",
                error: undefined
            },
            queue_time: "2026-08-21T02:00:00Z",
            daily: true
        },
    ]
};

const sampleWorker: WorkerAPIResponse = {
    status: "WorkerState.RUNNING",
    tasks: [
        {
                type: "Backup",
                title: "Daily Backup",
                status: "TaskState.COMPLETED",
                description: "Backup completed successfully",
                error: undefined
        },
        {
                type: "Fart",
                title: "I farted",
                status: "TaskState.FAILED",
                description: "asdf",
                error: "oopsie"
        },
        {
                type: "Slow",
                title: "sloth",
                status: "TaskState.RUNNING",
                description: "this is taking forever",
                error: undefined
        },
        {
                type: "Waiting",
                title: "impatient",
                status: "TaskState.NOT_STARTED",
                description: "I want to go now!!!",
                error: undefined
        },
    ]
};

const sampleDBInfo: DBInfoAPIResponse = {
    entry_count: "123",
    is_unlocked: true,
    newest_entry_time: "2026-08-21T01:00:00Z",
    oldest_entry_time: "2026-08-01T00:00:00Z"
};

export default function Status(props: MobileProps) {
    // -- States -- //
    // Data
    const [schedule, setSchedule] = useState<SchedulerAPIResponse>(sampleSchedule);
    const [worker, setWorker] = useState<WorkerAPIResponse>(sampleWorker);
    const [dbInfo, setDbInfo] = useState<DBInfoAPIResponse>(sampleDBInfo);
    // Elements
    const [scheduleElements, setScheduleElements] = useState<JSX.Element[] | undefined>(undefined);
    const [workerElements, setWorkerElements] = useState<JSX.Element[] | undefined>(undefined);
    const [systemStatusElements, setSystemStatusElements] = useState<JSX.Element | undefined>(undefined);
    // Page state
    const [isLoading, setLoading] = useState(true);

    // -- Function to build elements for entries -- //
    const buildScheduleEntry = (entry: SchedulerEntry) => <TaskListItem
        statusIcon={{
            avatar: <CalendarMonthIcon/>,
            avatarMainColor: "black",
            avatarBackgroundColor: "#dddddd"
        }}
        textPrimary={entry.task.type + " : " + entry.task.title}
        textSecondary={"will run at " + entry.queue_time + (entry.daily ? ", repeating daily" : "")}
        backgroundColor="#F9FAFB"
    />;
    const buildWorkerEntry = (entry: WorkerTask) => <DynamicIconTaskListItem
        dynamicStatusIcon={{
                iconList: [
                    [
                        "TaskState.COMPLETED",
                        {
                            avatar: <CheckCircleIcon/>,
                            avatarMainColor: "#00aa00",
                            avatarBackgroundColor: "#aaffaa"
                        }
                    ],
                    [
                        "TaskState.FAILED",
                        {
                            avatar: <ReportProblemIcon/>,
                            avatarMainColor: "#aa0000",
                            avatarBackgroundColor: "#ffaaaa"
                        }
                    ],
                    [
                        "TaskState.NOT_STARTED",
                        {
                            avatar: <PendingIcon/>,
                            avatarMainColor: "#888888",
                            avatarBackgroundColor: "#dddddd"
                        }
                    ],
                    [
                        "TaskState.RUNNING",
                        {
                            avatar: <LoopIcon/>,
                            avatarMainColor: "#666666",
                            avatarBackgroundColor: "#dddddd"
                        }
                    ],
                    // Additional icon entries based on the general icon list comment
                    [
                        "TaskState.IDLE",
                        {
                            avatar: <PendingIcon/>,
                            avatarMainColor: "#aaaaaa",
                            avatarBackgroundColor: "#dddddd"
                        }
                    ],
                    [
                        "TaskState.SHUT_DOWN",
                        {
                            avatar: <PowerSettingsNewIcon/>,
                            avatarMainColor: "#aa0000",
                            avatarBackgroundColor: "#ffaaaa"
                        }
                    ],
                    [
                        "TaskState.SCHEDULED",
                        {
                            avatar: <CalendarMonthIcon/>,
                            avatarMainColor: "#00aa00",
                            avatarBackgroundColor: "#aaffaa"
                        }
                    ],
                ],
            selected: entry.status
        }} 
        textPrimary={entry.type + " : " + entry.title}
        textSecondary={entry.status == "TaskState.FAILED" ? (entry.error ? entry.error : "") : entry.description}
        backgroundColor="#F9FAFB"
    />;
    const buildSystemStatus = (status: WorkerStatus, dbInfoLocal: DBInfoAPIResponse) => <>
        {/* Database lock indicator */}
        {dbInfoLocal.is_unlocked ?
            <TaskListItem
                statusIcon={{
                    avatar: <ReportProblemIcon/>,
                    avatarMainColor: "#aa0000",
                    avatarBackgroundColor: "#ffaaaa"
                }}
                textPrimary="Database is LOCKED"
                textSecondary="If it's been locked for a while, the app likely crashed"
                backgroundColor="#efe8f0"
            />  : 
            <></>
        }

        {/* TaskWorker Status */}
        <DynamicIconTaskListItem
            dynamicStatusIcon={{
                iconList: [
                    [
                        "WorkerState.IDLE",
                        {
                            avatar: <ModeStandbyIcon/>,
                            avatarMainColor: "black",
                            avatarBackgroundColor: "#dddddd"
                        }
                    ],
                    [
                        "WorkerState.NOT_STARTED",
                        {
                            avatar: <PendingIcon/>,
                            avatarMainColor: "#888888",
                            avatarBackgroundColor: "#dddddd"
                        }
                    ],
                    [
                        "WorkerState.RUNNING",
                        {
                            avatar: <LoopIcon/>,
                            avatarMainColor: "#00aa00",
                            avatarBackgroundColor: "#aaffaa"
                        }
                    ],
                    [
                        "WorkerState.IDLE",
                        {
                            avatar: <PowerSettingsNewIcon/>,
                            avatarMainColor: "#aa0000",
                            avatarBackgroundColor: "#ffaaaa"
                        }
                    ],
                ],
                selected: status
            }}
            textPrimary={"System is " + SelectiveText({
                textList: [
                    ["WorkerState.IDLE", "Idle"],
                    ["WorkerState.NOT_STARTED", "Not running"],
                    ["WorkerState.RUNNING", "Running"],
                    ["WorkerState.SHUT_DOWN", "Shutting down"]
                ],
                selected: status
            })}
            textSecondary={SelectiveText({
                textList: [
                    ["WorkerState.IDLE", "No tasks are currently active"],
                    ["WorkerState.NOT_STARTED", "The app is still starting up"],
                    ["WorkerState.RUNNING", "The app is completing a task"],
                    ["WorkerState.SHUT_DOWN", "The app was shut down"]
                ],
                selected: status
            })}
            backgroundColor="#e2e8f0"
        />

        {/* Test: New entry time */}
        <TimelineTaskListItem
            textTitle="Data timeline"
            textTop={"Oldest: " + dbInfoLocal.oldest_entry_time}
            textMiddle={dbInfoLocal.entry_count + " entries"}
            textBottom={"Newest: " + dbInfoLocal.newest_entry_time}
            backgroundColor="#e2e8f0"
        />
    </>

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
            <div className={props.isMobile ? "" : "grid grid-cols-2 grid-rows-2"}> {/* TODO: Same as below with tablet view */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}/>
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}/>
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}/>
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}/>
            </div>
            {/* Mobile UI splitter*/}
            <div className={props.isMobile ? "" : "flex flex-row"}> {/* TODO: Same as below with tablet view */}
                {/* Task queue */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4 pb-16" sx={{marginRight: (props.isMobile ? "0" : "0.5rem")}}/>
                {/* Schedule */}
                <Skeleton animation="wave" className="rounded-2xl w-full mt-2 p-4 pb-16" sx={{marginLeft: (props.isMobile ? "0" : "0.5rem")}}/>
            </div>

        {/* // Error if the page fails to load
        // TODO: Error does not appear if the data fails to load during a refresh */}
        </> :
        scheduleElements == null || workerElements == null || systemStatusElements == null ?
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
            <div className={props.isMobile ? "" : "grid grid-cols-2"}>
                {/* System status */}
                {systemStatusElements}
                {/* Manual collection button */}
                <ItemButton text={"Start data collection now"} statusIcon={{}} color="purple" callback={()=>{alert("Hello!")}}/>
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