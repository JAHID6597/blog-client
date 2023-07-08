import React, { useState } from "react";
import {
	Toolbar,
	IconButton,
	Typography,
	Avatar,
	Box,
	Skeleton,
} from "@mui/material";
import { Home, Menu as MenuIcon, PersonOutline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import AppBar from "./app-bar";
import DropDown from "../../common/drop-down";
import { useNavigate } from "react-router-dom";
import { dashboarddrawerwidth } from "../../../config/style.config";
import LinkTo from "../../common/link-to";
import { APP_NAME } from "../../../config/config";

const DashboardAppbar = ({ open, setOpen, privateProfile }) => {
	const handleDrawerOpen = () => setOpen(true);
	const theme = useTheme();
	const navigate = useNavigate();

	const [avatarDropDown, setAvatarDropDown] = useState(null);

	const handleDropDownItem = (url) => {
		navigate(url);
	};

	const avatarDropDownItems = [
		{ icon: Home, title: "Go To Home", url: "/" },
		{
			icon: PersonOutline,
			title: "Profile",
			url: `/user/${privateProfile?.userName}`,
		},
	];

	return (
		<AppBar
			theme={theme}
			drawerwidth={dashboarddrawerwidth}
			position="fixed"
			open={open}
			sx={{ background: "#fff", zIndex: 1500 }}
		>
			<Toolbar>
				<IconButton
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						color: "#5e5e5e",
						mr: 2,
						...(open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<Typography
						as={LinkTo}
						variant="h6"
						noWrap
						component="div"
						sx={{ color: "#5e5e5e", fontWeight: "bold" }}
						url="/"
					>
						{APP_NAME}
					</Typography>

					<Box>
						{privateProfile?.userName[0] ? (
							<IconButton
								sx={{ p: 0, mx: 1 }}
								onClick={(e) =>
									setAvatarDropDown(e.currentTarget)
								}
							>
								<Avatar src={privateProfile?.profilePicture}>
									{privateProfile?.profilePicture
										? ""
										: privateProfile?.userName[0]}
								</Avatar>
							</IconButton>
						) : (
							<Skeleton
								variant="circular"
								sx={{ p: 0, mx: 1 }}
								width={40}
								height={40}
							/>
						)}

						<DropDown
							items={avatarDropDownItems}
							anchorEl={avatarDropDown}
							setAnchorEl={setAvatarDropDown}
							handleItemClicked={handleDropDownItem}
						/>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default DashboardAppbar;
