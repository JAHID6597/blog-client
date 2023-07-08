import React, { useEffect } from "react";
import {
	Avatar,
	Box,
	Button,
	Typography,
	Divider,
	IconButton,
	Skeleton,
} from "@mui/material";

import {
	MoreHoriz,
	LocationOn,
	Launch,
	Cake,
	GitHub,
	Facebook,
	Twitter,
} from "@mui/icons-material";
import getName from "../../utils/get-name";
import moment from "moment";
import RedirectNewPage from "../common/redirect-new-page";
import {
	followUser,
	resetUserActionState,
} from "../../features/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfileCard = () => {
	const { userName } = useParams();
	const { publicProfile, privateProfile, isActionError, message } =
		useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isFollowed = privateProfile?.followings?.some(
		(user) => user === publicProfile?._id,
	);

	const metaData = [
		publicProfile?.address && {
			id: "upmtdt1",
			icon: LocationOn,
			title: publicProfile?.address,
		},
		publicProfile?.createdAt && {
			id: "upmtdt2",
			icon: Cake,
			title: `Joined on ${moment(publicProfile?.createdAt).format("LL")}`,
		},
	].filter(Boolean);

	const socialUrls = [
		publicProfile?.socialUrl?.website && {
			id: "upsclurl1",
			icon: Launch,
			url: publicProfile?.socialUrl?.website,
		},
		publicProfile?.socialUrl?.github && {
			id: "upsclurl2",
			icon: GitHub,
			url: publicProfile?.socialUrl?.github,
		},
		publicProfile?.socialUrl?.facebook && {
			id: "upsclurl3",
			icon: Facebook,
			url: publicProfile?.socialUrl?.facebook,
		},
		publicProfile?.socialUrl?.twitter && {
			id: "upsclurl4",
			icon: Twitter,
			url: publicProfile?.socialUrl?.twitter,
		},
	].filter(Boolean);

	useEffect(() => {
		if (isActionError) {
			if (!privateProfile) navigate("/user/signin", { replace: true });
			else toast.error(message);
		}

		return () => dispatch(resetUserActionState());
	}, [dispatch, isActionError, message, navigate, privateProfile]);

	return (
		<Box
			sx={{
				background: "white",
				borderRadius: "10px",
				boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
			}}
		>
			<Box sx={{ px: 3, position: "relative" }}>
				<Box
					sx={{
						width: 150,
						height: 150,
						position: "absolute",
						top: "-75px",
						left: "50%",
						transform: "translate(-50%)",
						background: publicProfile?.favouriteColor,
						borderRadius: "50%",
					}}
				/>
				<Avatar
					sx={{
						width: 130,
						height: 130,
						position: "absolute",
						top: "-65px",
						left: "50%",
						transform: "translate(-50%)",
					}}
					src={publicProfile?.profilePicture}
				/>

				<Box sx={{ paddingTop: { md: "30px", xs: "90px" } }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: { md: "flex-end", xs: "center" },
							flexWrap: "wrap",
							gap: 1,
						}}
					>
						{publicProfile?.userName ? (
							<>
								<Button
									variant="contained"
									onClick={() =>
										dispatch(followUser(userName))
									}
									color={isFollowed ? "success" : "primary"}
								>
									{isFollowed ? "Followed" : "Follow"}
								</Button>
								<IconButton>
									<MoreHoriz />
								</IconButton>
							</>
						) : (
							<Skeleton
								variant="text"
								sx={{ mb: 2 }}
								width={100}
							/>
						)}
					</Box>
				</Box>

				<Box sx={{ pt: 2 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						{publicProfile?.userName ? (
							<Typography
								variant="h2"
								sx={{ fontSize: 30, fontWeight: "bold", pb: 2 }}
							>
								{getName(publicProfile)}
							</Typography>
						) : (
							<Skeleton
								variant="text"
								sx={{ mb: 2 }}
								width={100}
							/>
						)}

						{publicProfile?.userName ? (
							publicProfile?.bio ? (
								<Typography
									variant="body2"
									sx={{
										fontSize: 20,
										pb: 2,
										textAlign: "center",
									}}
								>
									{publicProfile?.bio}
								</Typography>
							) : (
								""
							)
						) : (
							<Skeleton
								variant="text"
								sx={{ mb: 2 }}
								width={200}
							/>
						)}
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							flexWrap: "wrap",
							py: 3,
							gap: 3,
						}}
					>
						{metaData.map((meta) => (
							<Box
								key={meta.id}
								sx={{
									display: "flex",
									justifyContent: "space-evenly",
									flexWrap: "wrap",
									pb: 1,
									gap: 1,
								}}
							>
								{<meta.icon />}{" "}
								{meta.title && (
									<Typography
										variant="body2"
										sx={{ fontSize: 18 }}
									>
										{meta.title}
									</Typography>
								)}
							</Box>
						))}

						{socialUrls.length ? (
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-evenly",
									flexWrap: "wrap",
									pb: 1,
									gap: 2,
								}}
							>
								{socialUrls.map((socialUrl) => (
									<IconButton
										key={socialUrl.id}
										onClick={() =>
											RedirectNewPage(socialUrl.url)
										}
										sx={{ color: "inherit" }}
									>
										{<socialUrl.icon />}
									</IconButton>
								))}
							</Box>
						) : (
							""
						)}
					</Box>
				</Box>
			</Box>

			{publicProfile?.work?.position ||
			publicProfile?.work?.organization ||
			publicProfile?.education?.degree ||
			publicProfile?.education?.institution ? (
				<React.Fragment>
					<Divider />

					<Box sx={{ py: 3, px: 3 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								flexWrap: "wrap",
								pb: 1,
								gap: 3,
							}}
						>
							{publicProfile?.userName ? (
								publicProfile?.work?.position ||
								publicProfile?.work?.organization ? (
									<Box sx={{ textAlign: "center", gap: 2 }}>
										<Typography
											variant="body2"
											sx={{
												fontSize: 22,
												fontWeight: "bold",
											}}
										>
											Work
										</Typography>
										<Typography
											variant="body2"
											sx={{ fontSize: 20 }}
										>
											{publicProfile?.work?.position +
												`${
													publicProfile?.work
														?.position &&
													publicProfile?.work
														?.organization
														? ", "
														: ""
												}` +
												publicProfile?.work
													?.organization}
										</Typography>
									</Box>
								) : (
									""
								)
							) : (
								<Skeleton variant="text" width={100} />
							)}

							{publicProfile?.userName ? (
								publicProfile?.education?.degree ||
								publicProfile?.education?.institution ? (
									<Box sx={{ textAlign: "center", gap: 2 }}>
										<Typography
											variant="body2"
											sx={{
												fontSize: 22,
												fontWeight: "bold",
											}}
										>
											Education
										</Typography>
										<Typography
											variant="body2"
											sx={{ fontSize: 20 }}
										>
											{publicProfile?.education?.degree +
												`${
													publicProfile?.education
														?.degree &&
													publicProfile?.education
														?.institution
														? ", "
														: ""
												}` +
												publicProfile?.education
													?.institution}
										</Typography>
									</Box>
								) : (
									""
								)
							) : (
								<Skeleton variant="text" width={100} />
							)}
						</Box>
					</Box>
				</React.Fragment>
			) : (
				""
			)}
		</Box>
	);
};

export default UserProfileCard;
