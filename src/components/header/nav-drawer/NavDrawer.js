import React from "react";
import { SwipeableDrawer } from "@mui/material";
import SideBar from "./side-bar/SideBar";

const NavDrawer = ({ toggleSideBar, setToggleSideBar, toggleDrawer }) => {
	return (
		<SwipeableDrawer
			sx={{ display: { md: "none", xs: "block" } }}
			anchor="left"
			open={toggleSideBar}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
		>
			<SideBar
				setToggleSideBar={setToggleSideBar}
				toggleDrawer={toggleDrawer}
			/>
		</SwipeableDrawer>
	);
};

export default NavDrawer;
