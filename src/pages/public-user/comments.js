import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPublicUserInfoTabItemState } from "../../features/common/common.slice";
import {
	getCommentsByPublicUser,
	resetUserCommentState,
	resetDataState,
} from "../../features/blog/blog.slice";
import PublicUserComments from "../../components/public-user-comments/public-user-comments";

const Comments = () => {
	const { userName } = useParams();

	const { publicUserComments, publicUserCommentsMetaData, resetData } =
		useSelector((state) => state.blog);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (userName)
			dispatch(
				getCommentsByPublicUser({
					userName,
					page,
					limit: 12,
					search: "",
				}),
			);

		return () => dispatch(resetUserCommentState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		dispatch(resetPublicUserInfoTabItemState(3));

		return () => dispatch(resetPublicUserInfoTabItemState(0));
	}, [dispatch]);

	return (
		<PublicUserComments
			allComments={publicUserComments}
			metaData={publicUserCommentsMetaData}
			setPage={setPage}
			resetData={resetData}
			resetDataState={resetDataState}
		/>
	);
};

export default Comments;
