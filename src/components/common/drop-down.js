import React from "react";
import {
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Fade,
} from "@mui/material";

const DropDown = ({ items, anchorEl, setAnchorEl, handleItemClicked }) => {
	const open = Boolean(anchorEl);
	const handleClose = () => setAnchorEl(null);

	return (
		<Menu
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			TransitionComponent={Fade}
			sx={{ zIndex: 1600 }}
		>
			{items.map((item) => (
				<MenuItem
					key={item.title}
					onClick={
						item.url
							? () => handleItemClicked(item.url)
							: item.onClick
					}
				>
					<ListItemIcon>{<item.icon />}</ListItemIcon>
					<ListItemText>{item.title}</ListItemText>
				</MenuItem>
			))}
		</Menu>
	);
};

export default DropDown;
