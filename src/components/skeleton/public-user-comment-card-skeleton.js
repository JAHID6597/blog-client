import React from "react";
import { Grid } from "@mui/material";
import PublicUserCommentCard from "../public-user-comments/public-user-comment-card";

const PublicUserCommentCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1, 2] : [1, 2, 3, 4, 5];

	return (
		<Grid container spacing={2}>
			{data.map((d) => (
				<PublicUserCommentCard key={d} item={data} />
			))}
		</Grid>
	);
};

export default PublicUserCommentCardSkeleton;
