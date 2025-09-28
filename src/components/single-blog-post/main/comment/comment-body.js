import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CommentBody = ({ comment }) => {
	const navigate = useNavigate();

	return (
		<Box sx={{ width: "100%" }}>
			<Box
				sx={{
					m: 1,
					p: 2,
					boxShadow:
						"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
				}}
			>
				{comment?.user?.userName ? (
					<Typography
						variant="h4"
						sx={{
							cursor: "pointer",
							mb: 0.5,
							wordBreak: "break-all",
							fontSize: 17,
							fontWeight: "bold",
							textTransform: "uppercase",
						}}
						disableElevation
						onClick={() =>
							navigate(`/user/${comment?.user?.userName}`)
						}
					>
						{comment?.user?.userName}
					</Typography>
				) : (
					<Skeleton variant="text" />
				)}

				{comment?.createdAt ? (
					<Typography
						variant="body1"
						sx={{ fontSize: 14, color: "gray" }}
					>
						{" "}
						{moment(comment?.createdAt, "YYYYMMDD").fromNow()}{" "}
					</Typography>
				) : (
					<Skeleton variant="text" width={100} />
				)}

				{comment.comment ? (
					<Typography variant="body1" sx={{ fontSize: 16, pt: 2 }}>
						{" "}
						{comment.comment}
					</Typography>
				) : (
					<Skeleton variant="rectangular" width="100%" />
				)}
			</Box>
		</Box>
	);
};

export default CommentBody;
