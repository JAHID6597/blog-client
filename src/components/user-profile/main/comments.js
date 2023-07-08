import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import ShortTitle from "../../common/short-title";
import CommentCard from "../../common/comment-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import CommentCardSkeleton from "../../skeleton/comment-card-skeleton";

const Comments = ({
	title,
	allComments,
	metaData,
	resetData,
	resetDataState,
	setPage,
}) => {
	const [data, setData] = useState([]);
	const [skeletonLoading, setSkeletonLoading] = useState(false);

	const [hasMoreItems, sethasMoreItems] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		} else setData((prevData) => [...prevData, ...allComments]);
	}, [allComments, dispatch, resetData, resetDataState]);

	useEffect(() => {
		setSkeletonLoading(data.length > 0);
	}, [data.length]);

	const fetchComments = () => {
		if (metaData.total <= data.length) sethasMoreItems(false);
		else setPage((page) => page + 1);
	};

	return (
		<Box
			sx={{
				background: "white",
				borderRadius: "10px",
				boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
			}}
		>
			<Box sx={{ p: 2 }}>
				<ShortTitle title={title} />
			</Box>

			<Box alignItems="stretch">
				<InfiniteScroll
					dataLength={data.length}
					next={fetchComments}
					hasMore={hasMoreItems}
					loader={
						<CommentCardSkeleton
							skeletonLoading={skeletonLoading}
						/>
					}
				>
					{data.map((item) => (
						<>
							<Divider />

							<CommentCard item={item} />
						</>
					))}
				</InfiniteScroll>
			</Box>
		</Box>
	);
};

export default Comments;
