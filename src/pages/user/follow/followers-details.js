import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import options from "../../../config/table/options.config";
import {
	followUser,
	getFollowerUsers,
	resetUserActionState,
	resetUserCommonState,
} from "../../../features/user/user.slice";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import followTableColumns from "./follow-table-columns";
import { useNavigate } from "react-router-dom";

const FollowersDetails = () => {
	const {
		followers,
		followersMetaData,
		privateProfile,
		isLoading,
		isError,
		isUpdateSuccess,
	} = useSelector((state) => state.user);
	const key = "follower";

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			getFollowerUsers({
				userName: privateProfile.userName,
				page,
				limit,
				search,
			}),
		);

		return () => dispatch(resetUserActionState());
	}, [dispatch, limit, page, privateProfile.userName, search]);

	useEffect(() => {
		if (isUpdateSuccess) toast.success("Successfully updated.");
		if (isError) toast.error("Something went wrong.");

		return () => dispatch(resetUserCommonState());
	}, [dispatch, isError, isUpdateSuccess]);

	const unFollowUser = (rowIndex) => {
		const { follower } = followers[rowIndex];
		dispatch(followUser(follower.userName));
	};

	const navigateToUserProfilePage = (rowIndex) => {
		const { follower } = followers[rowIndex];
		navigate(`/user/${follower.userName}`);
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Followers"
				data={followers}
				columns={followTableColumns(
					navigateToUserProfilePage,
					key,
					unFollowUser,
				)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					followersMetaData,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default FollowersDetails;
