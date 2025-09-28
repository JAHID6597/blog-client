import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import UserProfileCard from "../components/user-profile/user-profile-card";
import LeftSidebar from "../components/user-profile/left-sidebar/left-sidebar";
import Main from "../components/home/main/main";
import Comments from "../components/user-profile/main/comments";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	getPublicProfile,
	resetDataState as resetUserDataState,
	resetUserPublicState,
} from "../features/user/user.slice";
import {
	getCommentsByPublicUser,
	getBlogsByPublicUser,
	resetDataState,
	resetUserBlogState,
} from "../features/blog/blog.slice";
import { resetPageLayoutPadding } from "../features/common/common.slice";

const UserProfile = () => {
	const { userName } = useParams();

	const {
		isError,
		publicProfile,
		publicUserComments,
		publicUserCommentsMetaData,
		resetData: resetUserData,
	} = useSelector((state) => state.user);
	const {
		blogsByPublicUser,
		blogsMetaDataByPublicUser,
		resetData,
		loading: blogLoading,
	} = useSelector((state) => state.blog);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [commentPage, setCommentPage] = useState(1);

	useEffect(() => {
		if (userName) dispatch(getPublicProfile(userName));

		return () => dispatch(resetUserPublicState());
	}, [dispatch, userName]);

	useEffect(() => {
		if (userName)
			dispatch(
				getBlogsByPublicUser({ userName, page, limit: 5, search: "" }),
			);

		return () => dispatch(resetUserBlogState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		if (userName)
			dispatch(
				getCommentsByPublicUser({
					userName,
					page: commentPage,
					limit: 5,
					search: "",
				}),
			);

		return () => dispatch(resetUserBlogState());
	}, [dispatch, commentPage, userName]);

	useEffect(() => {
		if (isError) navigate("/404", { replace: true });

		return () => dispatch(resetUserPublicState());
	}, [dispatch, isError, navigate]);

	useEffect(() => {
		dispatch(resetPageLayoutPadding(true));

		return () => dispatch(resetPageLayoutPadding(false));
	}, [dispatch]);

	return (
		<>
			<Box
				sx={{
					height: "160px",
					background: publicProfile?.favouriteColor,
				}}
			/>

			<Container>
				<Box sx={{ marginTop: "-80px" }}>
					<UserProfileCard />
				</Box>

				<Grid container sx={{ py: 2, height: "100%" }} spacing={2}>
					<Grid item md={4} xs={12}>
						<LeftSidebar />
					</Grid>

					<Grid item md={8} xs={12}>
						<Main
							blogs={blogsByPublicUser}
							metaData={blogsMetaDataByPublicUser}
							resetData={resetData}
							isLoading={blogLoading}
							setPage={setPage}
							resetDataState={resetDataState}
						/>

						{publicUserComments?.length ? (
							<Comments
								title="Comments"
								allComments={publicUserComments}
								metaData={publicUserCommentsMetaData}
								resetData={resetUserData}
								resetDataState={resetUserDataState}
								setPage={setCommentPage}
							/>
						) : (
							""
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default UserProfile;
