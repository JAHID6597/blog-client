import { styled } from "@mui/material/styles";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open, drawerwidth }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),

		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),

		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),

		[theme.breakpoints.up("md")]: {
			marginLeft:
				!open && `calc(-${drawerwidth} + ${theme.spacing(9)} + 1px)`,
		},
	}),
);

export default Main;
