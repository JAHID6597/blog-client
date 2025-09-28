import React, { useEffect, useState } from "react";
import Main from "../../components/home/main/main";
import { useDispatch, useSelector } from "react-redux";
import {
	getLikedBlogsByPublicUser,
	resetDataState,
	resetUserLikedBlogState,
} from "../../features/blog/blog.slice";
import { useParams } from "react-router-dom";
import { resetPublicUserInfoTabItemState } from "../../features/common/common.slice";

const LikedBlogs = () => {
	const { userName } = useParams();

	const {
		likedBlogsByPublicUser,
		likedBlogsMetaDataByPublicUser,
		resetData,
	} = useSelector((state) => state.blog);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (userName)
			dispatch(
				getLikedBlogsByPublicUser({
					userName,
					page,
					limit: 5,
					search: "",
				}),
			);

		return () => dispatch(resetUserLikedBlogState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		dispatch(resetPublicUserInfoTabItemState(1));
		return () => dispatch(resetPublicUserInfoTabItemState(0));
	}, [dispatch]);

	return (
		<Main
			blogs={likedBlogsByPublicUser}
			metaData={likedBlogsMetaDataByPublicUser}
			resetData={resetData}
			setPage={setPage}
			resetDataState={resetDataState}
			type="only_liked"
		/>
	);
};

export default LikedBlogs;
