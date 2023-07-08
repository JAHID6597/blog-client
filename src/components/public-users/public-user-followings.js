import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import PublicUserCardSkeleton from "../skeleton/public-user-card-skeleton";
import PublicUserCard from "./public-user-card";

const PublicUserFollowings = ({
	users,
	metaData,
	setPage,
	resetData,
	resetDataState,
}) => {
	const [data, setData] = useState([]);
	const [skeletonLoading, setSkeletonLoading] = useState(false);

	const [hasMoreItems, sethasMoreItems] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		} else setData((prevData) => [...prevData, ...users]);
	}, [users, dispatch, resetData, resetDataState]);

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (metaData.total <= data.length) sethasMoreItems(false);
	}, [data.length, metaData.total]);

	const fetchComments = () => {
		if (metaData.total <= data.length) sethasMoreItems(false);
		else setPage((page) => page + 1);
	};

	return (
		<Box alignItems="stretch">
			<InfiniteScroll
				dataLength={data.length}
				next={fetchComments}
				hasMore={hasMoreItems}
				loader={
					<PublicUserCardSkeleton skeletonLoading={skeletonLoading} />
				}
			>
				<Grid container spacing={2}>
					{data.map((item) => (
						<PublicUserCard key={item._id} user={item.following} />
					))}
				</Grid>
			</InfiniteScroll>
		</Box>
	);
};

export default PublicUserFollowings;
