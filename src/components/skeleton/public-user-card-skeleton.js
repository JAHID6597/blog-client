import React from "react";
import { Grid } from "@mui/material";
import PublicUserCard from "../public-users/public-user-card";

const PublicUserCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1, 2] : [1, 2, 3, 4, 5, 6];

	return (
		<Grid container spacing={2}>
			{data.map((d) => (
				<PublicUserCard key={d} item={data} />
			))}
		</Grid>
	);
};

export default PublicUserCardSkeleton;
