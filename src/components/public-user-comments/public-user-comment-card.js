import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PublicUserCommentCard = ({ comment }) => {
	const navigate = useNavigate();

	return (
		<Grid item md={6} sm={12}>
			<Box sx={{ width: "100%" }}>
				<Box
					sx={{
						m: 1,
						p: 2,
						boxShadow:
							"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
						background: "#ffffff",
					}}
				>
					{comment?.blog?.title ? (
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
								navigate(`/blog/${comment?.blog?.slug}`)
							}
						>
							{comment?.blog?.title}
						</Typography>
					) : (
						<Skeleton variant="text" />
					)}

					{comment?.comment ? (
						<Typography
							variant="body1"
							sx={{ fontSize: 16, pt: 2 }}
						>
							{" "}
							{comment.comment}
						</Typography>
					) : (
						<Skeleton variant="rectangular" width="100%" />
					)}
				</Box>
			</Box>
		</Grid>
	);
};

export default PublicUserCommentCard;
