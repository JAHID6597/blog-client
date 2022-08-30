import React from "react";
import { Box } from "@mui/material";
import BlogCardContent from "../../../blog-card/blog-card-content";
import BlogCardMedia from "../../../blog-card/blog-card-media";
import CardHeaderItem from "../../../common/card-header-item";

const BlogGridCard = ({ blog, height = "150px", lgDevice = false }) => {
	return (
		<Box sx={{ width: "100%" }}>
			{lgDevice ? (
				<>
					<BlogCardMedia blog={blog} height={height} />
					<CardHeaderItem blog={blog} />
				</>
			) : (
				<>
					<CardHeaderItem blog={blog} />
					<BlogCardMedia blog={blog} height={height} />
				</>
			)}
			<BlogCardContent blog={blog} />
		</Box>
	);
};

export default BlogGridCard;
