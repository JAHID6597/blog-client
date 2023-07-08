import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "../components/single-blog-post/left-sidebar/left-sidebar";
import Main from "../components/single-blog-post/main/main";
import RightSidebar from "../components/single-blog-post/right-sidebar/right-sidebar";
import {
	getBlog,
	getComments,
	getReadNextBlogs,
	resetBlogState,
	resetBlogCommentState,
	resetBlogCommonState,
} from "../features/blog/blog.slice";
import SingleBlogPostBottomNavigation from "../components/single-blog-post/single-blog-post-bottom-navigation";
import { toast } from "react-toastify";

const SingleBlog = () => {
	const { slug } = useParams();

	const { blog, isError, isActionError, message } = useSelector(
		(state) => state.blog,
	);
	const { privateProfile } = useSelector((state) => state.user);

	const [commentPage, setCommentPage] = useState(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) navigate("/404", { replace: true });
		if (isActionError) {
			if (!privateProfile) navigate("/user/signin", { replace: true });
			else toast.error(message);
		}

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isActionError, isError, message, navigate, privateProfile]);

	useEffect(() => {
		if (slug) {
			dispatch(getBlog(slug));
			dispatch(getReadNextBlogs({ slug, page: 1, limit: 5 }));
		}

		return () => dispatch(resetBlogState());
	}, [dispatch, slug]);

	useEffect(() => {
		if (slug) dispatch(getComments({ slug, page: commentPage, limit: 5 }));

		return () => dispatch(resetBlogCommentState());
	}, [commentPage, dispatch, slug]);

	return (
		<>
			<Container maxWidth="xl">
				<Grid container>
					<Grid
						item
						lg={1}
						sx={{ px: 2, display: { lg: "block", xs: "none" } }}
					>
						<LeftSidebar blog={blog} />
					</Grid>

					<Grid
						item
						lg={8}
						md={8}
						xs={12}
						sx={{ px: { md: 2, xs: 0 } }}
					>
						<Main setCommentPage={setCommentPage} />
					</Grid>

					<Grid
						item
						lg={3}
						md={4}
						sx={{
							px: { md: 2, xs: 0 },
							width: "100%",
							mt: { md: 0, sm: 3 },
						}}
					>
						<RightSidebar />
					</Grid>
				</Grid>
			</Container>

			<SingleBlogPostBottomNavigation blog={blog} />
		</>
	);
};

export default SingleBlog;
