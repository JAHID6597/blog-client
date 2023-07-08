import { AppBar as MuiAppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerwidth,
		width: `calc(100% - ${drawerwidth})`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	width: open ? `calc(100% - ${drawerwidth})` : "100%",
	marginLeft: !open && `-${drawerwidth}`,
	zIndex: 1,
	[theme.breakpoints.down("md")]: {
		width: "100%",
		marginLeft: 0,
	},
}));

export default AppBar;
