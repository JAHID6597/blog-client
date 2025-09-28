import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1, 0, 2),
	...theme.mixins.toolbar,
	justifyContent: "space-between",
}));

export default DrawerHeader;
