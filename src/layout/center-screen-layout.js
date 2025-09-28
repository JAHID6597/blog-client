import React from "react";
import { Box } from "@mui/material";

const CenterScreenLayout = ({ height, children }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: height || { md: "80vh", xs: "90vh" },
			}}
		>
			{children}
		</Box>
	);
};

export default CenterScreenLayout;
