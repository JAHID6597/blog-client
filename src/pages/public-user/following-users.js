import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PublicUserFollowings from "../../components/public-users/public-user-followings";
import { resetPublicUserInfoTabItemState } from "../../features/common/common.slice";
import {
	resetUserActionState,
	resetDataState,
	getFollowingUsers,
} from "../../features/user/user.slice";

const FollowingUsers = () => {
	const { userName } = useParams();

	const { followings, followingsMetaData, resetData } = useSelector(
		(state) => state.user,
	);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (userName)
			dispatch(
				getFollowingUsers({ userName, page, limit: 6, search: "" }),
			);

		return () => dispatch(resetUserActionState());
	}, [dispatch, page, userName]);

	useEffect(() => {
		dispatch(resetPublicUserInfoTabItemState(5));
		return () => dispatch(resetPublicUserInfoTabItemState(0));
	}, [dispatch]);

	return (
		<PublicUserFollowings
			users={followings}
			metaData={followingsMetaData}
			setPage={setPage}
			resetData={resetData}
			resetDataState={resetDataState}
		/>
	);
};

export default FollowingUsers;
