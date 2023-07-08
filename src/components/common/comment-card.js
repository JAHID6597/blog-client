import React from "react";
import { Box, ListItem, Skeleton, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetDataState as resetUserDataState } from "../../features/user/user.slice";
import { resetDataState as resetBlogDataState } from "../../features/blog/blog.slice";

const CommentCard = ({ item, fontWeight }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleItemClick = () => {
		dispatch(resetUserDataState(true));
		dispatch(resetBlogDataState(true));

		navigate(`/blog/${item.blog.slug}`, { replace: true });
	};

	return (
		<ListItem>
			<Box sx={{ width: "100%" }}>
				{item?.blog?.title ? (
					<Typography
						variant="h3"
						sx={{
							fontSize: 17,
							fontWeight: fontWeight || "bold",
							cursor: "pointer",
							"&:hover": { color: "#000aaa" },
						}}
						onClick={handleItemClick}
					>
						{item?.blog?.title}
					</Typography>
				) : (
					<Skeleton sx={{ ml: 2 }} variant="text" />
				)}

				{item?.comment ? (
					<Typography
						variant="body1"
						sx={{ fontSize: 14, pt: 1, color: "gray" }}
					>
						{item?.comment}
					</Typography>
				) : (
					<Skeleton sx={{ ml: 2 }} variant="text" />
				)}
			</Box>
		</ListItem>
	);
};

export default CommentCard;
