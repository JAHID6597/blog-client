import React from "react";
import { Fade } from "react-reveal";
import { Card, Grid } from "@mui/material";
import BlogListCard from "./blog-list-card";
import BlogGridCard from "./blog-grid-card";
import useWindowSize from "../../../../hook/useWindowSize";

const BlogCard = ({ blog, index, gridItem }) => {
	const windowSize = useWindowSize();

	return (
		<Grid item sm={gridItem.includes(index) ? 6 : 12} xs={12}>
			<Fade>
				<Card
					sx={{
						display: "flex",
						mb: 2,
						height: {
							sm:
								windowSize.width > 599 &&
								gridItem.includes(index)
									? "100%"
									: "290px",
							xs: "100%",
						},
					}}
				>
					{windowSize.width > 599 ? (
						!gridItem.includes(index) ? (
							<BlogListCard blog={blog} index={index} />
						) : (
							<BlogGridCard
								blog={blog}
								height="260px"
								lgDevice={true}
							/>
						)
					) : (
						<BlogGridCard blog={blog} />
					)}
				</Card>
			</Fade>
		</Grid>
	);
};

export default BlogCard;
