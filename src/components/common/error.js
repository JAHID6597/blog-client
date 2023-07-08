import React from "react";
import { Box } from "@mui/material";

const Error = ({ message }) => {
	return (
		<Box
			className="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root"
			id="title-helper-text"
			sx={{ color: "red" }}
		>
			<Box className="MuiBox-root css-tokvmb">{message}</Box>
		</Box>
	);
};

export default Error;
