import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
	BookmarkBorder,
	Bookmark,
	ThumbUpOutlined,
	ThumbUp,
	InsertCommentOutlined,
	InsertComment,
} from "@mui/icons-material";
import { bookmarkBlog, likeBlog } from "../../features/blog/blog.slice";
import { useDispatch, useSelector } from "react-redux";
import { NavHashLink } from "react-router-hash-link";

const SingleBlogPostBottomNavigation = ({ blog }) => {
	const { privateProfile } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	return (
		<Paper
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				display: { lg: "none", xs: "block" },
			}}
			elevation={3}
		>
			<BottomNavigation showLabels>
				<BottomNavigationAction
					label={blog?.likes?.length}
					icon={
						privateProfile &&
						blog?.likes?.some(
							(like) => like?.user === privateProfile?._id,
						) ? (
							<ThumbUp />
						) : (
							<ThumbUpOutlined />
						)
					}
					onClick={() => dispatch(likeBlog(blog?.slug))}
				/>

				<BottomNavigationAction
					label={blog?.comments?.length}
					icon={
						<NavHashLink
							to="#blog-comment"
							style={{ color: "inherit", height: "content" }}
						>
							{privateProfile &&
							blog?.comments?.some(
								(comment) =>
									comment?.user === privateProfile?._id,
							) ? (
								<InsertComment />
							) : (
								<InsertCommentOutlined />
							)}
						</NavHashLink>
					}
				/>

				<BottomNavigationAction
					label={blog?.bookmarks?.length}
					icon={
						privateProfile &&
						blog?.bookmarks?.some(
							(bookmark) =>
								bookmark?.user === privateProfile?._id,
						) ? (
							<Bookmark />
						) : (
							<BookmarkBorder />
						)
					}
					onClick={() => dispatch(bookmarkBlog(blog?.slug))}
				/>
			</BottomNavigation>
		</Paper>
	);
};

export default SingleBlogPostBottomNavigation;
