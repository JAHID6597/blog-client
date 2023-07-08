import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ListItemDetails from "../../common/list-item-details";
import ProfileListCard from "./profile-list-card";
import {
	getBlogsByPublicUser,
	resetUserBlogState,
} from "../../../features/blog/blog.slice";

const RightSidebar = () => {
	const dispatch = useDispatch();

	const { blog, blogsByPublicUser } = useSelector((state) => state.blog);

	useEffect(() => {
		if (blog?.user?.userName)
			dispatch(
				getBlogsByPublicUser({
					userName: blog?.user?.userName,
					page: 1,
					limit: 5,
				}),
			);

		return () => dispatch(resetUserBlogState());
	}, [blog?.user?.userName, dispatch]);

	return (
		<>
			<ProfileListCard user={blog?.user} />

			<Box sx={{ pt: 2, mb: { sm: 7, md: 0 } }}>
				{blogsByPublicUser?.length ? (
					<ListItemDetails
						url={`/user/${blog?.user?.userName}`}
						title={`More from ${blog?.user?.userName}`}
						items={blogsByPublicUser}
						user={blog?.user}
					/>
				) : (
					[1].map((item) => <ListItemDetails key={item} />)
				)}
			</Box>
		</>
	);
};

export default RightSidebar;
