import { useState } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate
} from "react-router-dom";
import {
    Box
} from "@mui/material";
import DataView from "./pages/DataView";
import Status from "./pages/Status";
import About from "./pages/About"
import Container from "@mui/material/Container";
import Titlebar from "./components/Titlebar";
import HamburgerMenu from "./components/HamburgerMenu";
import Footer from "./components/Footer";
import FourOhFour from "./pages/404"
import { useIsMobile } from "./hooks/isMobile";
import { Toaster } from 'react-hot-toast';

function AppContent() {
    const currentPagePath = useLocation().pathname;
    const pageName =
        currentPagePath === "/index.html" ? "Status"
        : currentPagePath === "/view" ? "Data View"
        : currentPagePath === "/about" ? "About"
        : "";
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useIsMobile();
    // TODO: Dynamic page names relative to the actual list of pages
    // - This will need to be carried through into Navigation (HamburgerMenu and Titlebar)
    // - Not every single page needs the Export Button!
    // TODO: I think there's a more MUI friendly way to handle the collapsible sidebar but this works for now

    return (
        <>
            <Toaster/>
            <Box sx={{display:"flex"}}>
                <Box component="nav" sx={{width: isMobile || !menuOpen ? 0 : 250, flexShrink:{sm:0}}}>
                    {menuOpen || isMobile
                        ? <HamburgerMenu isMobile={isMobile} pageName={pageName} open={menuOpen} onClose={() => setMenuOpen(false)} />
                        : <></>
                    }
                    
                </Box>
                <Box component="main" className="grow flex flex-col" sx={{ minHeight: "100vh" }}>
                    <Titlebar pageName={pageName} setOpen={setMenuOpen} open={menuOpen} />
                    <Container className="mt-4 mb-16 grow">
                        <Routes>
                            <Route path="/" element={<Navigate to="/index.html" replace/>}/>
                            <Route path="/index.html" element={<Status isMobile={isMobile}/>} />
                            <Route path="/view" element={<DataView />} />
                            <Route path="/about" element={<About/>}/>
                            <Route path="*" element={<FourOhFour/>}/>
                        </Routes>
                    </Container>
                    <Footer/>
                </Box>
            </Box>
        </>
    )
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App