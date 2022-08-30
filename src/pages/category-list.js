import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

import { getCategories, resetDataState, resetState } from "../features/category/category.slice";
import CategoryListCardSkeleton from "../components/skeleton/category-list-card-skeleton";
import CategoryCard from "../components/cat-tag-card/category-card";


const CategoryList = () => {
	const { categories, metaData, resetData, isLoading: categoryLoading } = useSelector((state) => state.category);
	
	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [skeletonLoading, setSkeletonLoading] = useState(false);
	const [hasMoreItems, sethasMoreItems] = useState(true);
console.log(data)
	useEffect(() => {
		dispatch(getCategories({ page, limit: 12, search: searchParams.get('search') })).then(d => console.log(d));

		return () => dispatch(resetState());
	}, [dispatch, page, searchParams]);

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		}
		else setData(prevData => [...prevData, ...categories]);
	}, [categories, dispatch, resetData])

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (metaData.total <= data.length) sethasMoreItems(false);
	}, [data.length, metaData.total])

	const fetchCategories = () => {
		if (metaData.total <= data.length) sethasMoreItems(false);
		else setPage(page => page + 1);
	}

	return (
		<Container maxWidth="xl">
			<Box alignItems="stretch">
				<InfiniteScroll
					dataLength={data.length}
					next={fetchCategories}
					hasMore={hasMoreItems}
					loader={<CategoryListCardSkeleton skeletonLoading={skeletonLoading} />}
					style={{ overflow: 'hidden' }}
				>
					<Grid container spacing={2}>
						{data.map((category) => <CategoryCard category={category} />)}
					</Grid>
				</InfiniteScroll>
			</Box>
		</Container>
	);
};

export default CategoryList;
