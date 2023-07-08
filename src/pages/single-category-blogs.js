import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CategoryCard from "../components/cat-tag-card/category-card";
import Main from "../components/search/main/main";
import { getCategory, resetState } from "../features/category/category.slice";
import {
	getBlogsByCategory,
	resetBlogByCategoryState,
	resetDataState,
} from "../features/blog/blog.slice";

const SingleCategoryBlogs = () => {
	const { slug } = useParams();

	const { category, isError } = useSelector((state) => state.category);
	const {
		blogsByCategory,
		blogsByCategoryMetaData,
		resetData,
		isLoading: blogLoading,
	} = useSelector((state) => state.blog);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [page, setPage] = useState(1);

	useEffect(() => {
		if (isError) navigate("/404", { replace: true });
		return () => dispatch(resetState());
	}, [dispatch, isError, navigate]);

	useEffect(() => {
		if (slug) dispatch(getCategory(slug));

		return () => dispatch(resetState());
	}, [dispatch, slug]);

	useEffect(() => {
		if (slug) dispatch(getBlogsByCategory({ slug, page, limit: 12 }));

		return () => dispatch(resetBlogByCategoryState());
	}, [dispatch, page, slug]);

	return (
		<Container maxWidth="xl">
			<CategoryCard category={category} urlType="slug" />

			<Box sx={{ mt: 5 }}>
				<Main
					blogs={blogsByCategory}
					metaData={blogsByCategoryMetaData}
					resetData={resetData}
					isLoading={blogLoading}
					setPage={setPage}
					resetDataState={resetDataState}
				/>
			</Box>
		</Container>
	);
};

export default SingleCategoryBlogs;
