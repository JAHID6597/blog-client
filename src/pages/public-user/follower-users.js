import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPublicUserInfoTabItemState } from "../../features/common/common.slice";
import {
	getFollowerUsers,
	resetUserActionState,
	resetDataState,
} from "../../features/user/user.slice";
import PublicUserFollowers from "../../components/public-users/public-user-followers";

const FollowerUsers = () => {
	const { userName } = useParams();

	const { followers, followersMetaData, resetData } = useSelector(
		(state) => state.user,
	);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (userName)
			dispatch(
				getFollowerUsers({ userName, page, limit: 6, search: "" }),
			);

		return () => dispatch(resetUserActionState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		dispatch(resetPublicUserInfoTabItemState(4));
		return () => dispatch(resetPublicUserInfoTabItemState(0));
	}, [dispatch]);

	return (
		<PublicUserFollowers
			users={followers}
			metaData={followersMetaData}
			setPage={setPage}
			resetData={resetData}
			resetDataState={resetDataState}
		/>
	);
};

export default FollowerUsers;
