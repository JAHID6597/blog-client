import React from "react";
import { Box, ThemeProvider } from "@mui/material";

import muiDataTableTheme from "../config/table/mui-data-table-theme";

const MuiDataTableLayout = ({ children }) => {
	return (
		<ThemeProvider theme={muiDataTableTheme}>
			<Box sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
				{children}
			</Box>
		</ThemeProvider>
	);
};

export default MuiDataTableLayout;
