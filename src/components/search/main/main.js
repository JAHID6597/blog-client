import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import BlogCard from "./blog-card/blog-card";
import SearchBlogCardSkeleton from "../../skeleton/search-blog-card-skeleton";
import {
	resetBlogActionState,
	resetBlogCommonState,
} from "../../../features/blog/blog.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Main = ({ blogs, metaData, resetData, setPage, resetDataState }) => {
	const { isActionError, message, likedBlog, bookmarkedBlog } = useSelector(
		(state) => state.blog,
	);
	const { privateProfile } = useSelector((state) => state.user);

	const [data, setData] = useState([]);

	const [skeletonLoading, setSkeletonLoading] = useState(false);

	const [hasMoreItems, sethasMoreItems] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		} else setData((prevData) => [...prevData, ...blogs]);
	}, [blogs, dispatch, resetData, resetDataState]);

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (metaData.total <= data.length) sethasMoreItems(false);
	}, [data.length, metaData.total]);

	useEffect(() => {
		if (likedBlog) {
			setData((prevData) =>
				prevData.map((d) => {
					if (d._id === likedBlog._id)
						return { ...d, likes: likedBlog.likes };
					return d;
				}),
			);
		}

		if (bookmarkedBlog) {
			setData((prevData) =>
				prevData.map((d) => {
					if (d._id === bookmarkedBlog._id)
						return { ...d, bookmarks: bookmarkedBlog.bookmarks };
					return d;
				}),
			);
		}

		return () => dispatch(resetBlogActionState());
	}, [bookmarkedBlog, data, dispatch, likedBlog]);

	useEffect(() => {
		if (isActionError) {
			if (!privateProfile) navigate("/user/signin", { replace: true });
			else toast.error(message);
		}

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isActionError, message, navigate, privateProfile]);

	const fetchBlogs = () => {
		if (metaData.total <= data.length) sethasMoreItems(false);
		else setPage((page) => page + 1);
	};

	return (
		<Box alignItems="stretch">
			<InfiniteScroll
				dataLength={data.length}
				next={fetchBlogs}
				hasMore={hasMoreItems}
				loader={
					<SearchBlogCardSkeleton skeletonLoading={skeletonLoading} />
				}
				style={{ overflow: "hidden" }}
			>
				<Grid container spacing={2}>
					{data.map((blog) => (
						<BlogCard key={blog._id} blog={blog} />
					))}
				</Grid>
			</InfiniteScroll>
		</Box>
	);
};

export default Main;
