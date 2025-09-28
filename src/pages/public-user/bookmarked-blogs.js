import React, { useEffect, useState } from "react";
import Main from "../../components/home/main/main";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	getBookmarkedBlogsByPublicUser,
	resetDataState,
	resetUserBookmarkedBlogState,
} from "../../features/blog/blog.slice";
import { resetPublicUserInfoTabItemState } from "../../features/common/common.slice";

const BookmarkedBlogs = () => {
	const { userName } = useParams();

	const {
		bookmarkedBlogsByPublicUser,
		bookmarkedBlogsMetaDataByPublicUser,
		resetData,
	} = useSelector((state) => state.blog);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (userName)
			dispatch(
				getBookmarkedBlogsByPublicUser({
					userName,
					page,
					limit: 5,
					search: "",
				}),
			);

		return () => dispatch(resetUserBookmarkedBlogState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		dispatch(resetPublicUserInfoTabItemState(2));
		return () => dispatch(resetPublicUserInfoTabItemState(0));
	}, [dispatch]);

	return (
		<Main
			blogs={bookmarkedBlogsByPublicUser}
			metaData={bookmarkedBlogsMetaDataByPublicUser}
			resetData={resetData}
			setPage={setPage}
			resetDataState={resetDataState}
			type="only_bookmarked"
		/>
	);
};

export default BookmarkedBlogs;
