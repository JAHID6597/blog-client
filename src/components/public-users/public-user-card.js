import React from "react";
import {
	Avatar,
	Box,
	IconButton,
	Skeleton,
	Grid,
	Card,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Launch, GitHub, Facebook, Twitter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProfileMetaInfoItems } from "../user-profile/left-sidebar/getSidebarData";
import RedirectNewPage from "../common/redirect-new-page";

const PublicUserCard = ({ user }) => {
	const navigate = useNavigate();

	const profileMetaInfoItems = getProfileMetaInfoItems(user);

	const socialUrls = [
		user?.socialUrl?.website && {
			id: "upsclurl1",
			icon: Launch,
			url: user?.socialUrl?.website,
			color: "#000000",
		},
		user?.socialUrl?.github && {
			id: "upsclurl2",
			icon: GitHub,
			url: user?.socialUrl?.github,
			color: "#000000",
		},
		user?.socialUrl?.facebook && {
			id: "upsclurl3",
			icon: Facebook,
			url: user?.socialUrl?.facebook,
			color: "#4267B2",
		},
		user?.socialUrl?.twitter && {
			id: "upsclurl4",
			icon: Twitter,
			url: user?.socialUrl?.twitter,
			color: "#00ACEE",
		},
	].filter(Boolean);

	return (
		<Grid
			item
			md={4}
			xs={12}
			sx={{ display: "flex", alignItems: "stretch" }}
		>
			<Box sx={{ m: 1, display: "flex", width: "100%" }}>
				<Card
					sx={{
						boxShadow:
							"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						{user?.userName ? (
							<Box
								sx={{
									background: user?.favouriteColor,
									height: 70,
									width: "100%",
								}}
							/>
						) : (
							<Skeleton
								variant="text"
								sx={{ mt: -4, height: 120, width: "100%" }}
							/>
						)}
						{user?.userName ? (
							<Box sx={{ mt: "-45px" }}>
								<IconButton
									sx={{ justifyContent: "center" }}
									onClick={() =>
										navigate(`/user/${user?.userName}`)
									}
								>
									<Avatar
										sx={{ height: 70, width: 70 }}
										src={user?.profilePicture}
									>
										{user?.profilePicture
											? ""
											: user?.userName[0]}
									</Avatar>
								</IconButton>
								<Box sx={{ textAlign: "center" }}>
									<Typography
										variant="h4"
										sx={{
											cursor: "pointer",
											fontWeight: "bold",
										}}
										onClick={() =>
											navigate(`/user/${user?.userName}`)
										}
									>
										{user?.userName}
									</Typography>
								</Box>
							</Box>
						) : (
							<Box sx={{ mt: "-65px" }}>
								<IconButton sx={{ justifyContent: "center" }}>
									<Skeleton
										variant="circular"
										width={70}
										height={70}
									/>
								</IconButton>
								<Skeleton variant="text" />
							</Box>
						)}
					</Box>

					<List sx={{ p: 2 }}>
						{profileMetaInfoItems.map((item) => (
							<ListItem
								key={item.text}
								disablePadding
								sx={{
									py: item.icon && 1,
									cursor: item?.url ? "pointer" : "",
									"&:hover": {
										color: item?.url ? "#000aaa" : "",
									},
								}}
								onClick={() =>
									navigate(item?.url ? item?.url : "", {
										replace: true,
									})
								}
							>
								{item.icon && (
									<ListItemIcon sx={{ minWidth: "40px" }}>
										<item.icon />
									</ListItemIcon>
								)}
								<ListItemText>{item.text}</ListItemText>
							</ListItem>
						))}
					</List>

					{socialUrls?.length ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								flexWrap: "wrap",
								pb: 1,
								gap: 2,
							}}
						>
							{socialUrls?.map((socialUrl) => (
								<IconButton
									key={socialUrl.id}
									onClick={() =>
										RedirectNewPage(socialUrl.url)
									}
									sx={{ color: socialUrl.color }}
								>
									{<socialUrl.icon />}
								</IconButton>
							))}
						</Box>
					) : (
						""
					)}
				</Card>
			</Box>
		</Grid>
	);
};

export default PublicUserCard;
