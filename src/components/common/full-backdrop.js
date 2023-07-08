import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const FullBackdrop = ({ isOpenBackDrop }) => {
	return (
		<Backdrop sx={{ color: "#fff", zIndex: 5000 }} open={isOpenBackDrop}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default FullBackdrop;
