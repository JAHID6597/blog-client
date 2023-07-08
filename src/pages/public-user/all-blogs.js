import React, { useEffect, useState } from "react";
import Main from "../../components/home/main/main";
import { useDispatch, useSelector } from "react-redux";
import {
	getBlogsByPublicUser,
	resetDataState,
	resetUserBlogState,
} from "../../features/blog/blog.slice";
import { useParams } from "react-router-dom";
import { resetPublicUserInfoTabItemState } from "../../features/common/common.slice";

const AllBlogs = () => {
	const { userName } = useParams();

	const { blogsByPublicUser, blogsMetaDataByPublicUser, resetData } =
		useSelector((state) => state.blog);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (userName)
			dispatch(
				getBlogsByPublicUser({ userName, page, limit: 5, search: "" }),
			);

		return () => dispatch(resetUserBlogState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		dispatch(resetPublicUserInfoTabItemState(0));
		return () => dispatch(resetPublicUserInfoTabItemState(0));
	}, [dispatch]);

	return (
		<Main
			blogs={blogsByPublicUser}
			metaData={blogsMetaDataByPublicUser}
			resetData={resetData}
			setPage={setPage}
			resetDataState={resetDataState}
		/>
	);
};

export default AllBlogs;
