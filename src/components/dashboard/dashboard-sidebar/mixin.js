export const openedMixin = (theme, drawerwidth) => ({
	width: drawerwidth,
	overflowX: "hidden",

	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
});

export const closedMixin = (theme) => ({
	overflowX: "hidden",
	width: 0,
	zIndex: 0,

	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),

	[theme.breakpoints.up("md")]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});
