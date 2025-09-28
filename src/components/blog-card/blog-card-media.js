import React from "react";
import { Box, CardMedia, Skeleton } from "@mui/material";
import LinkTo from "../common/link-to";

const BlogCardMedia = ({ blog, height }) => {
	return (
		<Box sx={{ overflow: "hidden" }}>
			<LinkTo url={`/blog/${blog?.slug}`}>
				{blog?.cardImage ? (
					<CardMedia
						component="img"
						sx={{
							width: "100%",
							height,
							objectFit: "cover",
							transition: ".5s ease-in-out",
							"&:hover": { transform: "scale(1.5)" },
						}}
						image={blog?.cardImage}
						alt="Card Image"
					/>
				) : (
					<Skeleton
						variant="rectangular"
						width="100%"
						height={height}
					/>
				)}
			</LinkTo>
		</Box>
	);
};

export default BlogCardMedia;
