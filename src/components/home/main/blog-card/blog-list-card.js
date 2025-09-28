import React from "react";
import { Box } from "@mui/material";
import BlogCardContent from "../../../blog-card/blog-card-content";
import BlogCardMedia from "../../../blog-card/blog-card-media";
import CardHeaderItem from "../../../common/card-header-item";

const BlogListCard = ({ blog, index }) => {
	return (
		<>
			{index & 1 ? (
				<Box sx={{ width: { sm: "30%", xs: "100%" } }}>
					<BlogCardMedia height="290px" blog={blog} />
				</Box>
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: { sm: "70%", xs: "100%" },
					}}
				>
					<CardHeaderItem blog={blog} pb={1} />
					<BlogCardContent blog={blog} />
				</Box>
			)}
			{index & 1 ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: { sm: "70%", xs: "100%" },
					}}
				>
					<CardHeaderItem blog={blog} pb={1} />
					<BlogCardContent blog={blog} />
				</Box>
			) : (
				<Box sx={{ width: { sm: "30%", xs: "100%" } }}>
					<BlogCardMedia height="290px" blog={blog} />
				</Box>
			)}
		</>
	);
};

export default BlogListCard;
