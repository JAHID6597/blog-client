import { createTheme } from "@mui/material";

const muiDataTableTheme = createTheme({
	components: {
		MUIDataTableHeadCell: {
			styleOverrides: {
				root: {
					backgroundColor: "#EAEDED",
					fontWeight: "bold",
					minWidth: "200px",
					textAlign: "center",
				},
				contentWrapper: {
					justifyContent: "center",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: "bold",
					margin: "auto",
				},
			},
		},
		MUIDataTableBodyRow: {
			styleOverrides: {
				root: {
					"&:nth-of-type(odd)": {
						backgroundColor: "#FFFFFF",
					},
					"&:nth-of-type(even)": {
						backgroundColor: "#F5F5F5",
					},
				},
			},
		},
		MUIDataTableBodyCell: {
			styleOverrides: {
				root: {
					textAlign: "center",
				},
			},
		},
		MUITableCell: {
			styleOverrides: {
				root: {
					textAlign: "center",
					margin: "auto",
				},
			},
		},
	},
});

export default muiDataTableTheme;
