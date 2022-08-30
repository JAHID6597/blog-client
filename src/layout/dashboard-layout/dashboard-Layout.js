import React, { useState } from "react";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DrawerHeader from "../../components/dashboard/dashboard-appbar/drawer-header";
import DashboardAppbar from "../../components/dashboard/dashboard-appbar/dashboard-appbar";
import DashboardSidebar from "../../components/dashboard/dashboard-sidebar/dashboard-sidebar";
import Main from "./main";
import useWindowSize from "../../hook/useWindowSize";


const DashboardLayout = ({ type, privateProfile, dashboardMenu, background, children }) => {
	const windowSize = useWindowSize();
	const [open, setOpen] = useState(windowSize.width >= 768);
	const theme = useTheme();
	
	return (
		<Box sx={{ display: "flex", position: 'relative' }}>
			<DashboardAppbar open={open} setOpen={setOpen} privateProfile={privateProfile} />
            <DashboardSidebar open={open} setOpen={setOpen} type={type} dashboardMenu={dashboardMenu} />

			<Main open={open} sx={{ background: background || '#FFFFFF', minHeight: '100vh' }}>
				<DrawerHeader theme={theme} />
                {children}
			</Main>
		</Box>
	);
};

export default DashboardLayout;
