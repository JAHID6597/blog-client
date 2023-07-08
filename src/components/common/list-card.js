import React from "react";
import { Box, ListItem, Skeleton, Typography } from "@mui/material";

import { decodeHtmlEntity } from "../../utils/html-entity";
import truncate from "../../utils/truncate";
import { useNavigate } from "react-router-dom";
import { useReadingTime } from "react-hook-reading-time";
import { useDispatch } from "react-redux";
import { resetDataState } from "../../features/blog/blog.slice";

const ListCard = ({ item, fontWeight }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleItemClick = () => {
		dispatch(resetDataState(true));

		navigate(`/blog/${item.slug}`, { replace: true });
	};

	const blogContentReadingTime = useReadingTime(
		decodeHtmlEntity(item?.content) || "",
	);

	return (
		<ListItem
			sx={{ "&:hover": { background: "#E2E3F3" }, cursor: "pointer" }}
			onClick={handleItemClick}
		>
			<Box sx={{ width: "100%" }}>
				{item.title ? (
					<Typography
						variant="h3"
						sx={{ fontSize: 17, fontWeight: fontWeight || "bold" }}
					>
						{" "}
						{item.title}{" "}
					</Typography>
				) : (
					<Skeleton variant="text" />
				)}

				{item?.content ? (
					<Typography
						variant="body1"
						sx={{ fontSize: 14, pt: 1, color: "gray" }}
					>
						{truncate(decodeHtmlEntity(item?.content) || "").slice(
							0,
							100,
						)}
						{truncate(decodeHtmlEntity(item?.content) || "")
							.length > 100
							? "..."
							: ""}
					</Typography>
				) : (
					<Skeleton variant="text" />
				)}

				{item?.content ? (
					<Typography
						variant="subtitle2"
						sx={{ fontSize: 13, pt: 0.5, color: "gray" }}
					>
						{" "}
						{blogContentReadingTime.text}{" "}
					</Typography>
				) : (
					""
				)}
			</Box>
		</ListItem>
	);
};

export default ListCard;
