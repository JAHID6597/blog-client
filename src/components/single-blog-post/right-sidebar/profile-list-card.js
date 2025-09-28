import React, { useEffect } from "react";
import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import getName from "../../../utils/get-name";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	followUser,
	resetUserActionState,
} from "../../../features/user/user.slice";

const avatarStyles = {
	width: 50,
	height: 50,
	cursor: "pointer",
	position: "absolute",
	top: "-5px",
	transform: "translate(-50%)",
};

const ProfileListCard = ({ user }) => {
	const { privateProfile, isActionError, message } = useSelector(
		(state) => state.user,
	);

	const isFollowed = privateProfile?.followings?.some(
		(usr) => usr === user?._id,
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			<Box
				sx={{
					height: "30px",
					background: user?.favouriteColor
						? user?.favouriteColor
						: "transpant",
					borderRadius: "10px 10px 0 0",
				}}
			/>

			<Box sx={{ marginTop: "-15px" }}>
				<Box sx={{ px: 5, position: "relative" }}>
					{user?.userName[0] ? (
						<Avatar
							sx={avatarStyles}
							onClick={() => navigate(`/user/${user?.userName}`)}
							src={user?.profilePicture}
						>
							{user?.profilePicture ? "" : user?.userName[0]}
						</Avatar>
					) : (
						<Skeleton sx={avatarStyles} variant="circular" />
					)}
				</Box>

				<Box sx={{ pt: "25px", pl: "70px" }}>
					{getName(user) ? (
						<Typography
							variant="h3"
							sx={{
								cursor: "pointer",
								fontSize: 18,
								fontWeight: "bold",
							}}
							onClick={() => navigate(`/user/${user?.userName}`)}
						>
							{getName(user)}
						</Typography>
					) : (
						<Skeleton variant="text" width={100} />
					)}
				</Box>
			</Box>

			<Box sx={{ p: 2 }}>
				{user?.userName ? (
					<Button
						variant="contained"
						onClick={() => dispatch(followUser(user?.userName))}
						fullWidth
						sx={{ mb: 2 }}
						color={isFollowed ? "success" : "primary"}
					>
						{isFollowed ? "Followed" : "Follow"}
					</Button>
				) : (
					<Skeleton variant="text" sx={{ mb: 2 }} width={100} />
				)}

				{user?.userName ? (
					user?.bio ? (
						<Typography sx={{ color: "gray", mb: 2 }}>
							{user?.bio}
						</Typography>
					) : (
						""
					)
				) : (
					<Box sx={{ mb: 2 }}>
						<Skeleton variant="text" />
						<Skeleton variant="text" />
					</Box>
				)}

				<Box sx={{ mb: 2 }}>
					{user?.userName ? (
						user?.address ? (
							<>
								<Typography
									variant="h5"
									sx={{ fontSize: 16, fontWeight: "bold" }}
								>
									Address
								</Typography>
								<Typography
									variant="body2"
									sx={{ fontSize: 15 }}
								>
									{user?.address}
								</Typography>
							</>
						) : (
							""
						)
					) : (
						<>
							<Skeleton variant="text" width={100} />
							<Skeleton variant="text" />
						</>
					)}
				</Box>

				<Box sx={{ mb: 2 }}>
					{user?.userName ? (
						user?.work?.position || user?.work?.organization ? (
							<>
								<Typography
									variant="h5"
									sx={{ fontSize: 16, fontWeight: "bold" }}
								>
									Work
								</Typography>
								<Typography
									variant="body2"
									sx={{ fontSize: 15 }}
								>
									{user?.work?.position +
										`${
											user?.work?.position &&
											user?.work?.organization
												? ", "
												: ""
										}` +
										user?.work?.organization}
								</Typography>
							</>
						) : (
							""
						)
					) : (
						<>
							<Skeleton variant="text" width={100} />
							<Skeleton variant="text" />
						</>
					)}
				</Box>

				<Box>
					{user?.userName ? (
						user?.createdAt ? (
							<>
								<Typography
									variant="h5"
									sx={{ fontSize: 16, fontWeight: "bold" }}
								>
									JOINED
								</Typography>
								<Typography
									variant="body2"
									sx={{ fontSize: 15 }}
								>
									{moment(
										user?.createdAt,
										"YYYYMMDD",
									).fromNow()}
								</Typography>
							</>
						) : (
							""
						)
					) : (
						<>
							<Skeleton variant="text" width={100} />
							<Skeleton variant="text" />
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default ProfileListCard;
