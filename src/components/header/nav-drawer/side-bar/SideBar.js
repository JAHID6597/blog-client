import React, { useState } from "react";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Collapse,
} from "@mui/material";
import {
	Close,
	Home,
	Login,
	Person,
	PersonOutline,
	ExpandLess,
	ExpandMore,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../../../config/config";

const SideBar = ({ setToggleSideBar, toggleDrawer }) => {
	const navigate = useNavigate();

	const handleItemClick = (url) => {
		setToggleSideBar(false);
		navigate(url);
	};

	const [open, setOpen] = useState(false);
	const handleClick = () => setOpen((open) => !open);

	return (
		<>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography
					sx={{ fontSize: 25, cursor: "pointer" }}
					variant="h2"
					onClick={() => handleItemClick("/")}
				>
					{APP_NAME}
				</Typography>

				<IconButton onClick={toggleDrawer(false)}>
					<Close sx={{ fontSize: 30 }} />
				</IconButton>
			</Toolbar>

			<Box sx={{ width: { xs: "80vw", sm: "50vw" } }}>
				<List>
					<ListItem onClick={toggleDrawer(false)}>
						<ListItemIcon>
							<Home />
						</ListItemIcon>
						<ListItemText
							sx={{ textTransform: "uppercase" }}
							onClick={() => navigate("/")}
						>
							Home
						</ListItemText>
					</ListItem>

					<ListItem onClick={handleClick}>
						<ListItemIcon>
							<Login />
						</ListItemIcon>
						<ListItemText primary="SIGNIN" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>

					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem
								sx={{ pl: 4 }}
								onClick={() => handleItemClick("/users/auth")}
							>
								<ListItemIcon>
									<PersonOutline />
								</ListItemIcon>
								<ListItemText
									sx={{ textTransform: "uppercase" }}
								>
									USER
								</ListItemText>
							</ListItem>

							<ListItem
								sx={{ pl: 4 }}
								onClick={() => handleItemClick("/admins/auth")}
							>
								<ListItemIcon>
									<Person />
								</ListItemIcon>
								<ListItemText
									sx={{ textTransform: "uppercase" }}
								>
									ADMIN
								</ListItemText>
							</ListItem>
						</List>
					</Collapse>
				</List>
			</Box>
		</>
	);
};

export default SideBar;
