import {
	Button,
	CardContent,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { bookmarkBlog, likeBlog } from "../../features/blog/blog.slice";
import { decodeHtmlEntity } from "../../utils/html-entity";
import truncate from "../../utils/truncate";
import LinkTo from "../common/link-to";
import BlogCardMetaData from "./blog-card-meta-data";

const BlogCardContent = ({ blog }) => {
	return (
		<CardContent>
			<LinkTo url={`/blog/${blog?.slug}`}>
				{blog?.title ? (
					<Typography
						variant="h1"
						sx={{
							fontSize: 25,
							fontWeight: "bold",
							mb: 1,
							overflow: "hidden",
							whiteSpace: "pre-line",
							textOverflow: "ellipsis",
							height: 60,
						}}
					>
						{blog?.title}
					</Typography>
				) : (
					<Skeleton variant="text" sx={{ mb: 1 }} height={55} />
				)}

				{blog?.content ? (
					<Typography
						variant="h5"
						sx={{
							fontSize: 17,
							mb: 1,
							overflow: "hidden",
							whiteSpace: "pre-line",
							textOverflow: "ellipsis",
							height: 45,
						}}
					>
						{truncate(decodeHtmlEntity(blog?.content) || "")}
					</Typography>
				) : (
					<Skeleton variant="text" sx={{ mb: 1 }} height={45} />
				)}
			</LinkTo>

			<Stack
				direction="row"
				spacing={1.5}
				sx={{
					mb: 2,
					flexWrap: "wrap",
					overflow: "hidden",
					whiteSpace: "pre-line",
					textOverflow: "ellipsis",
					height: 25,
				}}
			>
				{blog?.tags?.length ? (
					blog.tags.map((tag) => (
						<Button
							key={tag}
							size="small"
							color="inherit"
							variant="contained"
							sx={{
								minHeight: 0,
								minWidth: 0,
								px: 0.5,
								py: 0,
								wordBreak: "break-all",
							}}
							disableElevation
						>
							{tag}
						</Button>
					))
				) : (
					<Stack
						direction="row"
						spacing={1.5}
						sx={{ mb: 5, flexWrap: "wrap" }}
					>
						{[1, 2, 3, 4, 5].map((i) => (
							<Skeleton key={i} variant="text" width={100} />
						))}
					</Stack>
				)}
			</Stack>

			<BlogCardMetaData
				likeBlog={likeBlog}
				blog={blog}
				decodeHtmlEntity={decodeHtmlEntity}
				bookmarkBlog={bookmarkBlog}
			/>
		</CardContent>
	);
};

export default BlogCardContent;
