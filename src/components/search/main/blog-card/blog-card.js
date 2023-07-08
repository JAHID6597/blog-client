import React from "react";
import { Fade } from "react-reveal";
import { Card, Grid } from "@mui/material";
import BlogListCard from "./blog-list-card";
import useWindowSize from "../../../../hook/useWindowSize";

const BlogCard = ({ blog }) => {
	const windowSize = useWindowSize();

	return (
		<Grid item lg={4} md={6} sm={12}>
			<Fade>
				<Card
					sx={{
						display: "flex",
						mb: 2,
						height: {
							sm: windowSize.width > 599 ? "100%" : "290px",
							xs: "100%",
						},
					}}
				>
					<BlogListCard blog={blog} />
				</Card>
			</Fade>
		</Grid>
	);
};

export default BlogCard;
