import {
    Box,
    Typography,
    Chip,
    Stack
} from "@mui/material";
import raddedlogo from "../assets/raddedlogo.jpg";
import { FaGithub } from "react-icons/fa";

export default function About() {
    return (
        <>
            <Box className="flex justify-center items-center h-full">
                <Box className="flex flex-col text-center items-center">
                    <Typography variant="h4" className="pt-4">
                        Radded's Home Assistant Data Dumper
                    </Typography>
                    <Box className="flex justify-center">
                        <Stack direction="row" spacing={1} className="pt-4">
                            <Chip onClick={()=>{window.open("https://github.com/RaddedMC/home-assistant-data-dumper", "_blank")}} icon={<FaGithub size="1.5em"/>} label="GitHub"/>
                            <Chip onClick={()=>{window.open("https://github.com/RaddedMC/home-assistant-data-dumper-frontend", "_blank")}} icon={<FaGithub size="1.5em"/>} label="GitHub: Frontend"/>
                            <Chip onClick={()=>{window.open("https://github.com/RaddedMC/home-assistant-addon-repo", "_blank")}} icon={<FaGithub size="1.5em"/>} label="GitHub: App Repo"/>
                        </Stack>
                    </Box>
                    <Typography className="pt-4">
                        A simple app <sub className=" text-gray-400">(or addon? no one knows anymore)</sub> that extracts and logs state history from your Home Assistant.<br/>
                        Why would you need this data? There's more to come!
                    </Typography>
                    <Box className="h-16 spacer"></Box>
                    <Box className="w-60 bg-slate-800 rounded-2xl">
                        <img src={raddedlogo}/>
                        <Typography variant="h6" className="pb-4 text-white">
                            Created by Radded
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
        </>
    )
}