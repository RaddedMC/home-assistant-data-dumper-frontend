import {
    Typography,
    Box
} from "@mui/material";
import { useEffect, useState } from "react";
import type { VersionsAPIResponse } from "../type/externalTypes/AddonVersionsTypes";

export default function Footer() {
    // -- States -- //
    // Versions
    const [backendVersion, setBackendVersion] = useState<string>();
    const [databaseVersion, setDatabaseVersion] = useState<number>();
    const frontendVersion = __APP_VERSION__;
    

    // -- Retrieve versions from API -- //
    useEffect(() => {
        fetch("api/versions")
            .then((response) => response.json())
            .then((data: VersionsAPIResponse) => {
                console.log(data);
                setBackendVersion(data.app_version);
                setDatabaseVersion(data.db_version);
            })
    }, [])

    return (
        <>
            <Box className=" bg-slate-300 text-center"> {/* TODO: The version numbers get a little long on mobile */}
                {/* PLEASE Make the backend version auto-update somehow */}
                <Typography variant="caption">
                    Coded with occasional vibes by Radded.
                </Typography>
                <Typography variant="caption" sx={{marginLeft: "1rem"}}>
                    Backend Version: {backendVersion}
                </Typography>
                <Typography variant="caption" sx={{marginLeft: "0.5rem"}}>
                    Frontend Version: {frontendVersion}
                </Typography>

                <Typography variant="caption" sx={{marginLeft: "0.5rem"}}>
                    Database Version: {databaseVersion}
                </Typography>
            </Box>
        </>
    );
}