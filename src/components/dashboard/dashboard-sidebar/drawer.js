import { Drawer as MuiDrawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import { closedMixin, openedMixin } from "./mixin";

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
	width: drawerwidth,
	position: "relative",
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",

	...(open && {
		...openedMixin(theme, drawerwidth),
		"& .MuiDrawer-paper": openedMixin(theme, drawerwidth),
	}),

	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),

	[theme.breakpoints.down("md")]: {
		position: "absolute",
	},
}));

export default Drawer;
