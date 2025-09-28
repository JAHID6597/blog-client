import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./comment";
import BlogCommentCardSkeleton from "../../../skeleton/blog-comment-card-skeleton";
import { resetDataState } from "../../../../features/blog/blog.slice";

const AllComments = ({ setCommentPage }) => {
	const { blog, comments, commentMetaData, resetData, isUpdateSuccess } =
		useSelector((state) => state.blog);

	const [data, setData] = useState([]);
	const [skeletonLoading, setSkeletonLoading] = useState(false);
	const [hasMoreItems, sethasMoreItems] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		} else {
			if (isUpdateSuccess)
				setData((prevData) => [...comments, ...prevData]);
			else setData((prevData) => [...prevData, ...comments]);
		}
	}, [comments, dispatch, isUpdateSuccess, resetData]);

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (commentMetaData.total <= data.length) sethasMoreItems(false);
	}, [data.length, commentMetaData.total]);

	const fetchComments = () => {
		console.log(commentMetaData.total, data.length);
		if (commentMetaData.total <= data.length) sethasMoreItems(false);
		else setCommentPage((page) => page + 1);
	};

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ fontWeight: "bold", fontSize: { md: 30, xs: 25 }, py: 3 }}
			>
				{" "}
				Comments ({commentMetaData?.total || 0}){" "}
			</Typography>

			<InfiniteScroll
				dataLength={data.length}
				next={fetchComments}
				hasMore={hasMoreItems}
				loader={
					blog?.comments?.length ? (
						<BlogCommentCardSkeleton
							skeletonLoading={skeletonLoading}
						/>
					) : (
						""
					)
				}
			>
				{data?.map((comment) => (
					<Comment key={comment._id} comment={comment} />
				))}
			</InfiniteScroll>
		</Box>
	);
};

export default AllComments;
