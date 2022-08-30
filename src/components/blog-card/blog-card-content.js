import React from "react";
import { Box, CardContent, Typography, Stack, Button, Skeleton } from "@mui/material";
import { BookmarkBorder, Bookmark, ThumbUpOutlined, ThumbUp, InsertCommentOutlined, InsertComment } from "@mui/icons-material";
import { useReadingTime } from "react-hook-reading-time";
import LinkTo from "../common/link-to";
import { decodeHtmlEntity } from "../../utils/html-entity";
import truncate from "../../utils/truncate";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkBlog, likeBlog } from "../../features/blog/blog.slice";
import { NavHashLink } from "react-router-hash-link";


const BlogCardContent = ({ blog }) => {
	const { privateProfile } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const blogContentReadingTime = useReadingTime(decodeHtmlEntity(blog?.content) || "");

	return (
		<CardContent>
			<LinkTo url={`/blog/${blog?.slug}`}>
				{blog?.title ? <Typography
					variant="h1"
					sx={{ fontSize: 25, fontWeight: "bold", mb: 1, overflow: "hidden", whiteSpace: "pre-line", textOverflow: "ellipsis", height: 60 }}
				>
					{blog?.title}
				</Typography> : <Skeleton variant="text" sx={{ mb: 1 }} height={55} />}

				{blog?.content ? <Typography
					variant="h5"
					sx={{ fontSize: 17, mb: 1, overflow: "hidden", whiteSpace: "pre-line", textOverflow: "ellipsis", height: 45 }}
				>
					{truncate(decodeHtmlEntity(blog?.content) || "")}
				</Typography> : <Skeleton variant="text" sx={{ mb: 1 }} height={45} />}
			</LinkTo>

			<Stack
				direction="row"
				spacing={1.5}
				sx={{ mb: 2, flexWrap: "wrap", overflow: "hidden", whiteSpace: "pre-line", textOverflow: "ellipsis", height: 25 }}
			>
				{blog?.tags?.length ? blog.tags.map((tag) =>
					<Button
						key={tag}
						size="small"
						color="inherit"
						variant="contained"
						sx={{ minHeight: 0, minWidth: 0, px: 0.5, py: 0, wordBreak: "break-all" }}
						disableElevation
					>
						{tag}
					</Button>
				) : <Stack direction="row" spacing={1.5} sx={{ mb: 5, flexWrap: "wrap" }}>
						{[1, 2, 3, 4, 5].map(i => <Skeleton key={i} variant="text" width={100} />)}
				</Stack>
				}
			</Stack>

			<Box sx={{ display: "flex", justifyContent: "space-between" }} spacing={3}>
				<Stack direction="row" spacing={3} >
					{blog.likes ?
						<Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} onClick={() => dispatch(likeBlog(blog?.slug))}>
							{privateProfile && blog?.likes?.some(like => like?.user === privateProfile?._id) ?
								<ThumbUp fontSize="small" /> :
								<ThumbUpOutlined fontSize="small" />
							}
							{blog.likes.length}
						</Button> :
						<Skeleton variant="text" width={50} />
					}
					
					{blog.comments ?
						<NavHashLink to={`/blog/${blog?.slug}#blog-comment`} style={{ color: 'inherit', height: 'content', textDecoration: 'none' }}>
							<Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
								{privateProfile && blog?.comments?.some(comment => comment?.user === privateProfile?._id) ?
									<InsertComment fontSize="small" /> :
									<InsertCommentOutlined fontSize="small" />
								}

								{blog.comments.length}
							</Button>
						</NavHashLink> :
						<Skeleton variant="text" width={50} />
					}
				</Stack>

				<Stack direction="row" spacing={3}>
					{decodeHtmlEntity(blog?.content) ?
						<Typography variant="body">
							{blogContentReadingTime.text}
						</Typography> :
						<Skeleton variant="text" width={50} />
					}

					{blog.bookmarks ?
						<Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} onClick={() => dispatch(bookmarkBlog(blog?.slug))}>
							{privateProfile && blog?.bookmarks?.some(bookmark => bookmark?.user === privateProfile?._id) ?
								<Bookmark fontSize="small"  /> :
								<BookmarkBorder fontSize="small"  />
							}
							{blog.bookmarks.length}
						</Button> :
						<Skeleton variant="text" width={50} />
					}
				</Stack>
				
			</Box>
		</CardContent>
	);
};

export default BlogCardContent;
