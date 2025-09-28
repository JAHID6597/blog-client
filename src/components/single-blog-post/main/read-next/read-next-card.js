import React from "react";
import {
	Avatar,
	Box,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetDataState } from "../../../../features/blog/blog.slice";

const ReadNextCard = ({ item }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleNavigateBlog = () => {
		navigate(`/blog/${item.slug}`);
		dispatch(resetDataState(true));
	};

	return (
		<Stack direction="row" spacing={3} sx={{ pb: 3 }}>
			{item?.user?.userName[0] ? (
				<IconButton
					onClick={() => navigate(`/user/${item?.user?.userName}`)}
				>
					<Avatar
						sx={{ width: 48, height: 48 }}
						src={item?.user?.profilePicture}
					>
						{item?.user?.profilePicture
							? ""
							: item?.user?.userName[0]}
					</Avatar>
				</IconButton>
			) : (
				<IconButton>
					<Skeleton variant="circular" width={48} height={48} />
				</IconButton>
			)}

			<Box sx={{ width: "100%" }}>
				{item.title ? (
					<Typography
						variant="h3"
						sx={{
							cursor: "pointer",
							fontSize: 20,
							fontWeight: "bold",
							mb: 1,
						}}
						onClick={handleNavigateBlog}
					>
						{item.title}
					</Typography>
				) : (
					<Skeleton variant="text" />
				)}

				{item?.createdAt ? (
					<Typography
						variant="body1"
						sx={{ fontSize: 14, color: "gray" }}
					>
						{" "}
						{moment(item?.createdAt, "YYYYMMDD").fromNow()}{" "}
					</Typography>
				) : (
					<Skeleton variant="text" width={100} />
				)}
			</Box>
		</Stack>
	);
};

export default ReadNextCard;
