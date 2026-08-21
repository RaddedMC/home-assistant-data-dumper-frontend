import {
    Box,
    Typography
} from "@mui/material";

export default function FourOhFour() {
    return <>
        <Box className="flex flex-col justify-center items-center h-full">
            <Typography variant="h1">404</Typography>
            <Typography>How do you even do that from within a Home Assistant app?</Typography>
        </Box>
    </>
}