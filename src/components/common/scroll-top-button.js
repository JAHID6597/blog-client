import React from "react";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollTopButton = () => {
	const trigger = useScrollTrigger({ disableHysteresis: true });

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			"#back-to-top-anchor",
		);

		if (anchor)
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
			>
				<Fab
					size="medium"
					aria-label="scroll back to top"
					sx={{
						background: "#6600ff",
						color: "white",
						"&:hover": { background: "#6600ff" },
					}}
				>
					<KeyboardArrowUp />
				</Fab>
			</Box>
		</Zoom>
	);
};

export default ScrollTopButton;
