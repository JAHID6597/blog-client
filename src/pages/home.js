import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import LeftSidebar from "../components/home/left-sidebar/left-sidebar";
import Main from "../components/home/main/main";
import RightSidebar from "../components/home/right-sidebar/right-sidebar";

import {
	getBlogs,
	resetBlogState,
	resetDataState,
} from "../features/blog/blog.slice";
import {
	getCategories,
	resetState as resetCategoryState,
} from "../features/category/category.slice";
import {
	getTags,
	resetState as resetTagState,
} from "../features/tag/tag.slice";

const Home = () => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const {
		blogs,
		metaData,
		resetData,
		loading: blogLoading,
	} = useSelector((state) => state.blog);
	console.log(blogs);
	useEffect(() => {
		dispatch(getBlogs({ page, limit: 10 }));

		return () => dispatch(resetBlogState());
	}, [dispatch, page]);

	useEffect(() => {
		dispatch(getCategories({ page: 1, limit: 25 }));
		dispatch(getTags({ page: 1, limit: 25 }));

		return () => {
			dispatch(resetCategoryState());
			dispatch(resetTagState());
		};
	}, [dispatch]);

	return (
		<Grid container>
			<Grid
				item
				lg={2}
				md={3}
				sx={{ px: 2, display: { xs: "none", md: "block" } }}
			>
				<LeftSidebar />
			</Grid>

			<Grid item lg={7} md={9} xs={12} sx={{ px: 2.5 }}>
				<Main
					blogs={blogs}
					metaData={metaData}
					resetData={resetData}
					isLoading={blogLoading}
					setPage={setPage}
					resetDataState={resetDataState}
				/>
			</Grid>

			<Grid
				item
				lg={3}
				sx={{ px: 2, display: { xs: "none", lg: "block" } }}
			>
				<RightSidebar />
			</Grid>
		</Grid>
	);
};

export default Home;
