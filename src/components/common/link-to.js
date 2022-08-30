import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const LinkTo = React.forwardRef((props, ref) => (
	<Box
		as={Link}
		to={props.url}
		sx={{
			textDecoration: "none",
			color: "black",
			"&:hover": { color: "#551A8B" },
		}}
		{...props}
	>
		{props.children}
	</Box>
));

export default LinkTo;
