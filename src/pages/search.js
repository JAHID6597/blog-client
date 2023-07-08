import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Main from "../components/search/main/main";
import {
	getBlogs,
	resetBlogState,
	resetDataState,
} from "../features/blog/blog.slice";

const Search = () => {
	const { blogs, metaData, resetData } = useSelector((state) => state.blog);
	const [searchParams] = useSearchParams();
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			getBlogs({
				page,
				limit: 10,
				search: searchParams.get("search"),
				category: searchParams.get("category"),
				tag: searchParams.get("tag"),
			}),
		);

		return () => dispatch(resetBlogState());
	}, [dispatch, page, searchParams]);

	return (
		<Container maxWidth="xl">
			<Main
				blogs={blogs}
				metaData={metaData}
				resetData={resetData}
				setPage={setPage}
				resetDataState={resetDataState}
			/>
		</Container>
	);
};

export default Search;
