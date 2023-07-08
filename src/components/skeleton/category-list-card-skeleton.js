import React from "react";
import { Grid } from "@mui/material";
import CategoryCard from "../cat-tag-card/category-card";

const CategoryListCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1, 2, 3] : [1, 2, 3, 4, 5, 6];

	return (
		<Grid container spacing={2}>
			{data.map((d) => (
				<CategoryCard category={data} />
			))}
		</Grid>
	);
};

export default CategoryListCardSkeleton;
