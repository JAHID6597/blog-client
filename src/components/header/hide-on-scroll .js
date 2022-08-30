import React from "react";
import { useScrollTrigger, Slide } from "@mui/material";

const HideOnScroll = (props) => {
	const { children } = props;
	const trigger = useScrollTrigger({});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

export default HideOnScroll;
