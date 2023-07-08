import React from "react";
import { Grid } from "@mui/material";

import BlogCard from "../search/main/blog-card/blog-card";

const SearchBlogCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1, 2, 3] : [1, 2, 3, 4, 5, 6];

	return (
		<Grid container spacing={2}>
			{data.map((d, index) => (
				<BlogCard key={d} blog={{}} index={index} />
			))}
		</Grid>
	);
};

export default SearchBlogCardSkeleton;
