import React from "react";
import { Grid } from "@mui/material";

import getGridItemArr from "../../utils/get-grid-item-arr";
import BlogCard from "../home/main/blog-card/blog-card";

const HomeBlogCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1] : [1, 2, 3, 4, 5];
	const gridItem = getGridItemArr(data);

	return (
		<Grid container spacing={2}>
			{data.map((d, index) => (
				<BlogCard key={d} blog={{}} index={index} gridItem={gridItem} />
			))}
		</Grid>
	);
};

export default HomeBlogCardSkeleton;
