import React from "react";
import { Button, Stack } from "@mui/material";

const ButtonItems = ({ items }) => {
	items?.map((item) => console.log(item));
	return (
		<Stack
			direction="row"
			sx={{
				flexWrap: "wrap",
				overflow: "hidden",
				whiteSpace: "pre-line",
				textOverflow: "ellipsis",
			}}
		>
			{items?.map((item) => (
				<Button
					key={item}
					size="small"
					color="inherit"
					variant="contained"
					sx={{
						minHeight: 0,
						minWidth: 0,
						px: 0.5,
						py: 0,
						m: 1,
						wordBreak: "break-all",
					}}
					disableElevation
				>
					{item}
				</Button>
			))}
		</Stack>
	);
};

export default ButtonItems;
