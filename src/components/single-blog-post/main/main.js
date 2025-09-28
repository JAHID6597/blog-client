import React from "react";

import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Blog from "./blog/blog";
import InputComment from "./comment/input-comment";
import AllComments from "./comment/all-comments";
import ReadNextCard from "./read-next/read-next-card";

const Main = ({ setCommentPage }) => {
	const { privateProfile } = useSelector((state) => state.user);
	const { readNextBlogs } = useSelector((state) => state.blog);

	return (
		<Box>
			<Box
				sx={{
					background: "white",
					minHeight: "100vh",
					borderRadius: "10px",
					boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
				}}
			>
				<Blog />

				<Divider sx={{ mb: 3 }} />

				<Box sx={{ px: { md: 5, xs: 0 } }} id="blog-comment">
					{privateProfile && (
						<Box sx={{ p: 2, py: 3 }}>
							<InputComment />
						</Box>
					)}

					<Box sx={{ px: 2, pb: 3 }}>
						<AllComments setCommentPage={setCommentPage} />
					</Box>
				</Box>
			</Box>

			{readNextBlogs?.length ? (
				<Box
					sx={{
						background: "#fafafa",
						my: 3,
						borderRadius: "10px",
						boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
						mb: { lg: 3, md: 7, sm: 3 },
					}}
				>
					<Box sx={{ px: { md: 5, xs: 1 } }}>
						<Typography
							variant="h3"
							sx={{
								fontWeight: "bold",
								fontSize: { md: 30, xs: 25 },
								py: 3,
							}}
						>
							Read Next
						</Typography>

						{readNextBlogs.map((blog) => (
							<ReadNextCard key={blog._id} item={blog} />
						))}
					</Box>
				</Box>
			) : (
				""
			)}
		</Box>
	);
};

export default Main;
