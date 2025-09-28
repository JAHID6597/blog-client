import React from "react";
import {
	Bookmark,
	BookmarkBorder,
	InsertComment,
	InsertCommentOutlined,
	ThumbUp,
	ThumbUpOutlined,
} from "@mui/icons-material";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useReadingTime } from "react-hook-reading-time";
import { useDispatch, useSelector } from "react-redux";
import { NavHashLink } from "react-router-hash-link";

const BlogCardMetaData = ({
	likeBlog,
	blog,
	decodeHtmlEntity,
	bookmarkBlog,
}) => {
	const { privateProfile } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const blogContentReadingTime = useReadingTime(
		decodeHtmlEntity(blog?.content) || "",
	);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
			}}
			spacing={3}
		>
			<Stack direction="row" spacing={3}>
				{blog.likes ? (
					<Button
						sx={{
							minHeight: 0,
							minWidth: 0,
							padding: 0,
						}}
						onClick={() => dispatch(likeBlog(blog?.slug))}
					>
						{privateProfile &&
						blog?.likes?.some(
							(like) => like?.user === privateProfile?._id,
						) ? (
							<ThumbUp fontSize="small" />
						) : (
							<ThumbUpOutlined fontSize="small" />
						)}
						{blog.likes.length}
					</Button>
				) : (
					<Skeleton variant="text" width={50} />
				)}

				{blog.comments ? (
					<NavHashLink
						to={`/blog/${blog?.slug}#blog-comment`}
						style={{
							color: "inherit",
							height: "content",
							textDecoration: "none",
						}}
					>
						<Button
							sx={{
								minHeight: 0,
								minWidth: 0,
								padding: 0,
							}}
						>
							{privateProfile &&
							blog?.comments?.some(
								(comment) =>
									comment?.user === privateProfile?._id,
							) ? (
								<InsertComment fontSize="small" />
							) : (
								<InsertCommentOutlined fontSize="small" />
							)}

							{blog.comments.length}
						</Button>
					</NavHashLink>
				) : (
					<Skeleton variant="text" width={50} />
				)}
			</Stack>

			<Stack direction="row" spacing={3}>
				{decodeHtmlEntity(blog?.content) ? (
					<Typography variant="body">
						{blogContentReadingTime.text}
					</Typography>
				) : (
					<Skeleton variant="text" width={50} />
				)}

				{blog.bookmarks ? (
					<Button
						sx={{
							minHeight: 0,
							minWidth: 0,
							padding: 0,
						}}
						onClick={() => dispatch(bookmarkBlog(blog?.slug))}
					>
						{privateProfile &&
						blog?.bookmarks?.some(
							(bookmark) =>
								bookmark?.user === privateProfile?._id,
						) ? (
							<Bookmark fontSize="small" />
						) : (
							<BookmarkBorder fontSize="small" />
						)}
						{blog.bookmarks.length}
					</Button>
				) : (
					<Skeleton variant="text" width={50} />
				)}
			</Stack>
		</Box>
	);
};

export default BlogCardMetaData;
