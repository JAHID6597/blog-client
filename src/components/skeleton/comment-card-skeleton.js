import React from "react";
import { Grid } from "@mui/material";
import CommentCard from "../common/comment-card";

const CommentCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1] : [1, 2, 3, 4, 5];

	return (
		<Grid container spacing={2}>
			{data.map((d, index) => (
				<CommentCard key={d} item={data} />
			))}
		</Grid>
	);
};

export default CommentCardSkeleton;
