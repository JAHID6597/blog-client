import React from "react";
import { Typography } from "@mui/material";

const ShortTitle = ({ title }) => {
	return (
		<Typography variant="h3" sx={{ fontSize: 18, fontWeight: "bold" }}>
			{title}
		</Typography>
	);
};

export default ShortTitle;
