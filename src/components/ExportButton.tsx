import {
    Fab
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

export default function ExportButton() {
    return (
        <>
            <a href="api/export/sqlite">
                <Fab
                variant="extended"
                color="primary"
                aria-label="export"
                sx={{
                    position: "fixed",
                    bottom: 38,
                    right: 16,
                    zIndex: 1300
                }}
            >
                    <DownloadIcon sx={{mr:1}}/>
                    Export data
                </Fab>
            </a>
        </>
    )
}