import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import PublicUserCommentCardSkeleton from "../skeleton/public-user-comment-card-skeleton";
import PublicUserCommentCard from "./public-user-comment-card";

const PublicUserComments = ({
	allComments,
	metaData,
	setPage,
	resetData,
	resetDataState,
}) => {
	const [data, setData] = useState([]);
	const [skeletonLoading, setSkeletonLoading] = useState(false);

	const [hasMoreItems, setHasMoreItems] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		} else setData((prevData) => [...prevData, ...allComments]);
	}, [allComments, dispatch, resetData, resetDataState]);

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (metaData.total <= data.length) setHasMoreItems(false);
	}, [data.length, metaData.total]);

	const fetchComments = () => {
		if (metaData.total <= data.length) setHasMoreItems(false);
		else setPage((page) => page + 1);
	};

	return (
		<Box alignItems="stretch">
			<InfiniteScroll
				dataLength={data.length}
				next={fetchComments}
				hasMore={hasMoreItems}
				loader={
					<PublicUserCommentCardSkeleton
						skeletonLoading={skeletonLoading}
					/>
				}
			>
				<Grid container spacing={2}>
					{data.map((item) => (
						<PublicUserCommentCard key={item._id} comment={item} />
					))}
				</Grid>
			</InfiniteScroll>
		</Box>
	);
};

export default PublicUserComments;
