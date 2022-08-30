import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import BlogCard from "./blog-card/blog-card";
import getGridItemArr from "../../../utils/get-grid-item-arr";
import HomeBlogCardSkeleton from "../../skeleton/home-blog-card-skeleton";
import { resetBlogActionState, resetBlogCommonState } from "../../../features/blog/blog.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Main = ({ blogs, metaData, resetData, setPage, resetDataState, type="" }) => {
	const { isActionError, message, likedBlog, bookmarkedBlog } = useSelector((state) => state.blog);
	const { privateProfile } = useSelector((state) => state.user);
	const [data, setData] = useState([]);
console.log(likedBlog)
	const [skeletonLoading, setSkeletonLoading] = useState(false);

	const [hasMoreItems, sethasMoreItems] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (resetData) {
			setData([]);
			dispatch(resetDataState(false));
		}
		else setData(prevData => [...prevData, ...blogs]);
	}, [blogs, dispatch, resetData, resetDataState])

	useEffect(() => {
		setSkeletonLoading(data.length > 0);

		if (metaData.total <= data.length) sethasMoreItems(false);
	}, [data.length, metaData.total])

	useEffect(() => {
		if (likedBlog) {
			setData(prevData => prevData.map(d => {
				if (d._id === likedBlog._id) return { ...d, likes: likedBlog.likes };
				return d;
			}))
		}

		if (bookmarkedBlog) {
			setData(prevData => prevData.map(d => {
				if (d._id === bookmarkedBlog._id) return { ...d, bookmarks: bookmarkedBlog.bookmarks };
				return d;
			}))
		}

		return () => dispatch(resetBlogActionState());
	}, [bookmarkedBlog, data, dispatch, likedBlog])

	useEffect(() => { 
		if (isActionError) {
			if (!privateProfile) navigate('/user/signin', { replace: true });
			else toast.error(message);
		}

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isActionError, message, navigate, privateProfile])
	
	useEffect(() => {
		if (type === "only_liked" && likedBlog) {
			setData(prevData => prevData.filter(d => d._id !== likedBlog._id));
		}

		if (type === "only_bookmarked" && bookmarkedBlog) {
			setData(prevData => prevData.filter(d => d._id !== bookmarkedBlog._id));
		}
	}, [bookmarkedBlog, likedBlog, type])

	const fetchBlogs = () => {
		if (metaData.total <= data.length) sethasMoreItems(false);
		else setPage(page => page + 1);
	}
	
	const gridItem = getGridItemArr(data);
	
	return (
		<Box alignItems="stretch">
			<InfiniteScroll
				dataLength={data.length}
				next={fetchBlogs}
				hasMore={hasMoreItems}
				loader={<HomeBlogCardSkeleton skeletonLoading={skeletonLoading} />}
			>
				<Grid container spacing={2}>
					{data.map((blog, index) => (
						<BlogCard
							key={blog._id}
							blog={blog}
							index={index}
							gridItem={gridItem}
						/>
					))}
				</Grid>
			</InfiniteScroll>
		</Box>
	);
};

export default Main;
