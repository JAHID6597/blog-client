import { useState } from "react";
import { useScrollTrigger } from "@mui/material";

const useToggleSidebar = () => {
	const trigger = useScrollTrigger({ disableHysteresis: true });

	const [toggleSideBar, setToggleSideBar] = useState(false);

	const toggleDrawer = (action) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		)
			return;

		setToggleSideBar(action);
	};

	return [trigger, toggleSideBar, setToggleSideBar, toggleDrawer];
};

export default useToggleSidebar;
