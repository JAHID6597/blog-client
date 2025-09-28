import React from "react";
import { Avatar, Box, IconButton, Skeleton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommentBody from "./comment-body";

const Comment = ({ comment }) => {
	const navigate = useNavigate();

	return (
		<Box sx={{ mb: 3 }}>
			<Stack direction="row" spacing={2}>
				<Box sx={{ pt: 2 }}>
					{comment?.user?.userName ? (
						<IconButton
							onClick={() =>
								navigate(`/user/${comment?.user?.userName}`)
							}
						>
							<Avatar src={comment?.user?.profilePicture}>
								{comment?.user?.profilePicture
									? ""
									: comment?.user?.userName[0]}
							</Avatar>
						</IconButton>
					) : (
						<IconButton>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
						</IconButton>
					)}
				</Box>

				<CommentBody navigate={navigate} comment={comment} />
			</Stack>
		</Box>
	);
};

export default Comment;
