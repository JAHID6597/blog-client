import React, { useEffect, useState } from "react";
import { Box, Grid, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getTags, resetDataState, resetState } from "../features/tag/tag.slice";
import TagCard from "../components/cat-tag-card/tag-card";
import TagListCardSkeleton from "../components/skeleton/tag-list-card-skeleton";

const TagList = () => {
	const { tags, metaData, resetData } = useSelector((state) => state.tag);

	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [skeletonLoading, setSkeletonLoading] = useState(false);
	const [hasMoreItems, sethasMoreItems] = useState(true);

	useEffect(() => {
		dispatch(
			getTags({ page, limit: 12, search: searchParams.get("search") }),
		).then((d) => console.log(d));

		return () => dispatch(resetState());
	}, [dispatch, page, searchParams]);

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		} else setData((prevData) => [...prevData, ...tags]);
	}, [tags, dispatch, resetData]);

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (metaData.total <= data.length) sethasMoreItems(false);
	}, [data.length, metaData.total]);

	const fetchTags = () => {
		if (metaData.total <= data.length) sethasMoreItems(false);
		else setPage((page) => page + 1);
	};

	return (
		<Container maxWidth="xl">
			<Box alignItems="stretch">
				<InfiniteScroll
					dataLength={data.length}
					next={fetchTags}
					hasMore={hasMoreItems}
					loader={
						<TagListCardSkeleton
							skeletonLoading={skeletonLoading}
						/>
					}
					style={{ overflow: "hidden" }}
				>
					<Grid container spacing={2}>
						{data.map((tag) => (
							<TagCard tag={tag} />
						))}
					</Grid>
				</InfiniteScroll>
			</Box>
		</Container>
	);
};

export default TagList;
