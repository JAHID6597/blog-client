import React from "react";
import { Grid } from "@mui/material";
import TagCard from "../cat-tag-card/tag-card";

const TagListCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1, 2, 3] : [1, 2, 3, 4, 5, 6];

	return (
		<Grid container spacing={2}>
			{data.map((d) => (
				<TagCard tag={data} />
			))}
		</Grid>
	);
};

export default TagListCardSkeleton;
