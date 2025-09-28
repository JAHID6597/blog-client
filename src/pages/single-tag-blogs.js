import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TagCard from "../components/cat-tag-card/tag-card";
import Main from "../components/search/main/main";
import { getTag, resetState } from "../features/tag/tag.slice";
import {
	getBlogsByTag,
	resetBlogByTagState,
	resetDataState,
} from "../features/blog/blog.slice";

const SingleTagBlogs = () => {
	const { slug } = useParams();

	const {
		tag,
		isError,
		isLoading: tagLoading,
	} = useSelector((state) => state.tag);
	const { blogsByTag, blogsByTagMetaData, resetData } = useSelector(
		(state) => state.blog,
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [page, setPage] = useState(1);

	useEffect(() => {
		if (isError) navigate("/404", { replace: true });
		return () => dispatch(resetState());
	}, [dispatch, isError, navigate]);

	useEffect(() => {
		dispatch(getTag(slug));

		return () => dispatch(resetState());
	}, [dispatch, slug]);

	useEffect(() => {
		dispatch(getBlogsByTag({ slug, page, limit: 12 })).then((d) =>
			console.log(d),
		);

		return () => dispatch(resetBlogByTagState());
	}, [dispatch, page, slug]);

	return (
		<Container maxWidth="xl">
			<TagCard tag={tag} urlType="slug" />

			<Box sx={{ mt: 5 }}>
				<Main
					blogs={blogsByTag}
					metaData={blogsByTagMetaData}
					resetData={resetData}
					isLoading={tagLoading}
					setPage={setPage}
					resetDataState={resetDataState}
				/>
			</Box>
		</Container>
	);
};

export default SingleTagBlogs;
