import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Skeleton,
	Stack,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	createComment,
	resetBlogCommonState,
} from "../../../../features/blog/blog.slice";

const InputComment = () => {
	const { slug } = useParams();
	const { privateProfile } = useSelector((state) => state.user);
	const { isCommentUpdateSuccess } = useSelector((state) => state.blog);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({ comment: "" });

	useEffect(() => {
		if (isCommentUpdateSuccess) {
			toast.success("Successfully added comment.");
			setFormData({ comment: "" });
		}

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isCommentUpdateSuccess]);

	const handleAddComment = (e) => {
		e.preventDefault();

		dispatch(createComment({ formData, slug }));
	};

	return (
		<Box component="form" autoComplete="off" onSubmit={handleAddComment}>
			<Stack direction="row" spacing={2}>
				{privateProfile?.userName ? (
					<IconButton
						onClick={() =>
							navigate(`/user/${privateProfile?.userName}`)
						}
					>
						<Avatar src={privateProfile?.profilePicture}>
							{privateProfile?.profilePicture
								? ""
								: privateProfile?.userName[0]}
						</Avatar>
					</IconButton>
				) : (
					<IconButton>
						<Skeleton variant="circular" width={40} height={40} />
					</IconButton>
				)}

				<TextField
					variant="outlined"
					label="Comment"
					placeholder="Enter your comment..."
					value={formData.comment}
					onChange={(e) =>
						setFormData({ ...formData, comment: e.target.value })
					}
					multiline
					rows={3}
					fullWidth
					required
				/>
			</Stack>

			<Box
				sx={{
					py: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<Button variant="contained" type="submit">
					Add Comment
				</Button>
			</Box>
		</Box>
	);
};

export default InputComment;
