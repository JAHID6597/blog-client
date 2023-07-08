import React, { useState, memo } from "react";
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Avatar,
	Paper,
	InputBase,
} from "@mui/material";
import {
	Menu as MenuIcon,
	PersonOutline,
	Logout,
	Dashboard,
	Search,
} from "@mui/icons-material";

import useToggleSidebar from "../../hook/useToggleSidebar";
import NavDrawer from "./nav-drawer/NavDrawer";
import HideOnScroll from "./hide-on-scroll ";
import { logout } from "../../features/user/user.slice";
import DropDown from "../common/drop-down";
import { resetDataState } from "../../features/blog/blog.slice";
import { APP_NAME } from "../../config/config";

const Header = () => {
	const { privateProfile, user } = useSelector((state) => state.user);

	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [trigger, toggleSideBar, setToggleSideBar, toggleDrawer] =
		useToggleSidebar();

	const [avatarDropDown, setAvatarDropDown] = useState(null);
	const [search, setSearch] = useState("");

	const handleDropDownItem = (url) => navigate(url);

	const handleUserLogout = () => {
		dispatch(logout());

		setTimeout(() => {
			navigate("/user/signin", { replace: true });
		}, 0);
	};

	const avatarDropDownItems = [
		{ icon: Dashboard, title: "Dashboard", url: "/user/dashboard" },
		{
			icon: PersonOutline,
			title: "Profile",
			url: `/user/${privateProfile?.userName}`,
		},
		{ icon: Logout, title: "Logout", onClick: handleUserLogout },
	];

	const handleSearch = (e) => {
		e.preventDefault();

		let queryParams = { search };
		if (searchParams.get("category"))
			queryParams = {
				...queryParams,
				category: searchParams.get("category"),
			};
		if (searchParams.get("tag"))
			queryParams = { ...queryParams, tag: searchParams.get("tag") };

		if (search) {
			dispatch(resetDataState(true));
			navigate(`/search?${createSearchParams(queryParams)}`, {
				replace: true,
			});
		}
	};

	const handleLogoClick = () => {
		dispatch(resetDataState(true));
		navigate("/", { replace: true });
	};

	return (
		<>
			<HideOnScroll>
				<AppBar
					color="transparent"
					sx={{ bgcolor: "white", zIndex: 5 }}
					elevation={trigger ? 3 : 0}
				>
					<Toolbar>
						<Typography
							mr="auto"
							sx={{
								fontSize: { md: 30, xs: 25 },
								cursor: "pointer",
							}}
							variant="h2"
							onClick={handleLogoClick}
						>
							{APP_NAME}
						</Typography>

						<Paper
							variant="outlined"
							component="form"
							sx={{
								m: "auto",
								p: "2px 4px",
								display: { md: "flex", xs: "none" },
								alignItems: "center",
								width: 400,
							}}
							onSubmit={handleSearch}
						>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								value={search}
								placeholder="Search from here..."
								onChange={(e) => setSearch(e.target.value)}
							/>
							<IconButton
								type="submit"
								sx={{ p: "10px" }}
								onClick={handleSearch}
							>
								<Search />
							</IconButton>
						</Paper>

						<Box ml="auto" fontSizeLarge>
							<Box sx={{ display: { md: "none" } }}>
								<IconButton
									type="submit"
									onClick={handleSearch}
								>
									<Search
										sx={{ fontSize: 35, color: "#000000" }}
									/>
								</IconButton>

								<IconButton
									color="inherit"
									onClick={toggleDrawer(true)}
								>
									<MenuIcon
										sx={{ fontSize: { sm: 40, xs: 35 } }}
									/>
								</IconButton>
							</Box>

							<NavDrawer
								toggleSideBar={toggleSideBar}
								setToggleSideBar={setToggleSideBar}
								toggleDrawer={toggleDrawer}
							/>

							<Box sx={{ display: { xs: "none", md: "block" } }}>
								{user ? (
									privateProfile ? (
										<>
											<IconButton
												sx={{ p: 0, mx: 1 }}
												onClick={(e) =>
													setAvatarDropDown(
														e.currentTarget,
													)
												}
											>
												<Avatar
													src={
														privateProfile?.profilePicture
													}
												/>
											</IconButton>

											<DropDown
												items={avatarDropDownItems}
												anchorEl={avatarDropDown}
												setAnchorEl={setAvatarDropDown}
												handleItemClicked={
													handleDropDownItem
												}
											/>
										</>
									) : (
										""
									)
								) : (
									<Box sx={{ display: "flex", gap: 1 }}>
										<Button
											color="inherit"
											sx={{ fontSize: 20 }}
											onClick={() =>
												navigate("/user/signin")
											}
										>
											signin
										</Button>

										<Button
											color="primary"
											variant="outlined"
											sx={{ fontSize: 20 }}
											onClick={() =>
												navigate("/user/signup")
											}
										>
											signup
										</Button>
									</Box>
								)}
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
			</HideOnScroll>

			<Toolbar id="back-to-top-anchor" />
		</>
	);
};

export default memo(Header);
