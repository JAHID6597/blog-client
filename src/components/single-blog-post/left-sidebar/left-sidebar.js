import React from "react";
import { NavHashLink } from "react-router-hash-link";
import { Box, IconButton, Typography } from "@mui/material";
import {
	BookmarkBorder,
	Bookmark,
	ThumbUpOutlined,
	ThumbUp,
	InsertCommentOutlined,
	InsertComment,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkBlog, likeBlog } from "../../../features/blog/blog.slice";

const LeftSidebar = ({ blog }) => {
	const { privateProfile } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	return (
		<Box sx={{ position: "sticky", top: 100 }}>
			<Box
				sx={{ textAlign: "center", mb: 2 }}
				onClick={() => dispatch(likeBlog(blog?.slug))}
			>
				<IconButton>
					{privateProfile &&
					blog?.likes?.some(
						(like) => like?.user === privateProfile?._id,
					) ? (
						<ThumbUp />
					) : (
						<ThumbUpOutlined />
					)}
				</IconButton>
				<Typography>{blog?.likes?.length}</Typography>
			</Box>

			<Box sx={{ textAlign: "center", mb: 2 }}>
				<IconButton as={NavHashLink} to="#blog-comment">
					{privateProfile &&
					blog?.comments?.some(
						(comment) => comment?.user === privateProfile?._id,
					) ? (
						<InsertComment />
					) : (
						<InsertCommentOutlined />
					)}
				</IconButton>
				<Typography>{blog?.comments?.length}</Typography>
			</Box>

			<Box
				sx={{ textAlign: "center", mb: 2 }}
				onClick={() => dispatch(bookmarkBlog(blog?.slug))}
			>
				<IconButton>
					{privateProfile &&
					blog?.bookmarks?.some(
						(bookmark) => bookmark?.user === privateProfile?._id,
					) ? (
						<Bookmark />
					) : (
						<BookmarkBorder />
					)}
				</IconButton>
				<Typography>{blog?.bookmarks?.length}</Typography>
			</Box>
		</Box>
	);
};

export default LeftSidebar;
