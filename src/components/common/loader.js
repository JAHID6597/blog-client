import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<Box sx={{ textAlign: "center" }}>
			<CircularProgress color="success" />
		</Box>
	);
};

export default Loader;
