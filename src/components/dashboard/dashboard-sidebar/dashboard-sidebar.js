import React, { useEffect, useState } from "react";
import {
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Backdrop,
	Typography,
	Collapse,
} from "@mui/material";
import {
	ChevronLeft,
	ChevronRight,
	ExpandLess,
	ExpandMore,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import DrawerHeader from "../dashboard-appbar/drawer-header";
import Drawer from "./drawer";
import LinkTo from "../../common/link-to";
import { Box } from "@mui/system";
import {
	dashboarddrawerwidth,
	userDashboardSidebarBackgroundColor,
	userDashboardTextColor,
} from "../../../config/style.config";
import { useLocation } from "react-router-dom";

const DashboardSidebar = ({ open, setOpen, type, dashboardMenu }) => {
	const theme = useTheme();
	const handleDrawerClose = () => setOpen(false);

	const location = useLocation();
	const [openSubMenuUrl, setOpenSubMenuUrl] = useState(location?.pathname);

	useEffect(() => {
		setOpenSubMenuUrl(location?.pathname);
	}, [location?.pathname]);

	return (
		<>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: 2000,
					display: { md: "none", sx: open ? "block" : "none" },
				}}
				open={open}
				onClick={() => setOpen(!open)}
			/>

			<Drawer
				variant="permanent"
				anchor="left"
				open={open}
				drawerwidth={dashboarddrawerwidth}
				sx={{ zIndex: open ? 3000 : 1000 }}
			>
				<Box
					sx={{
						background: userDashboardSidebarBackgroundColor,
						height: "100%",
					}}
				>
					<DrawerHeader>
						<Typography
							as={LinkTo}
							variant="h6"
							sx={{
								fontWeight: "bold",
								color: userDashboardTextColor,
								"&:hover": { color: userDashboardTextColor },
								textTransform: "uppercase",
							}}
							url={`${
								type === "user" ? "/user" : "/admin"
							}/dashboard`}
						>
							{type === "user" ? "User" : "Admin"}
						</Typography>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? (
								<ChevronLeft
									sx={{ color: userDashboardTextColor }}
								/>
							) : (
								<ChevronRight
									sx={{ color: userDashboardTextColor }}
								/>
							)}
						</IconButton>
					</DrawerHeader>

					<Divider
						sx={{ borderBottomColor: "rgba(150, 150, 150, 0.5)" }}
					/>

					<List sx={{ py: 0 }}>
						{dashboardMenu.map((menuItem) => (
							<React.Fragment key={menuItem.id}>
								<ListItem
									component={LinkTo}
									url={menuItem.url}
									sx={{
										color: userDashboardTextColor,
										"&:hover": {
											color: userDashboardTextColor,
										},
									}}
									onClick={() =>
										setOpenSubMenuUrl((value) =>
											value === menuItem?.children[0]?.url
												? ""
												: menuItem?.children[0]?.url,
										)
									}
								>
									<ListItemIcon>
										{" "}
										{menuItem.icon}{" "}
									</ListItemIcon>
									<ListItemText
										primary={menuItem.title}
										sx={{ wordWrap: "break-word" }}
									/>
									{menuItem.children.length ? (
										menuItem.children.some(
											(sub) => sub.url === openSubMenuUrl,
										) ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)
									) : (
										""
									)}
								</ListItem>

								<Collapse
									in={menuItem.children.some(
										(sub) => sub.url === openSubMenuUrl,
									)}
									timeout="auto"
									unmountOnExit
								>
									<List component="div" disablePadding>
										{menuItem.children.map((submenu) => (
											<ListItem
												key={submenu.id}
												component={LinkTo}
												url={submenu.url}
												sx={{
													pl: 4,
													py: 0.5,
													color: userDashboardTextColor,
													"&:hover": {
														color: userDashboardTextColor,
													},
												}}
												onClick={() =>
													setOpenSubMenuUrl(
														submenu.url,
													)
												}
											>
												<ListItemIcon>
													{" "}
													{submenu.icon}{" "}
												</ListItemIcon>
												<ListItemText
													primary={submenu.title}
												/>
											</ListItem>
										))}
									</List>
								</Collapse>
							</React.Fragment>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default DashboardSidebar;
