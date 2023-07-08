import React from "react";
import { Box } from "@mui/material";
import BlogCardContent from "../../../blog-card/blog-card-content";
import CardHeaderItem from "../../../common/card-header-item";

const BlogListCard = ({ blog }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
			<CardHeaderItem blog={blog} pb={0} />
			<BlogCardContent blog={blog} />
		</Box>
	);
};

export default BlogListCard;
