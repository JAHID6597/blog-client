import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import options from "../../../config/table/options.config";
import {
	getFollowingUsers,
	resetUserActionState,
	resetUserCommonState,
} from "../../../features/user/user.slice";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import followTableColumns from "./follow-table-columns";

const FollowingsDetails = () => {
	const {
		followings,
		followingsMetaData,
		privateProfile,
		isLoading,
		isError,
	} = useSelector((state) => state.user);
	const key = "following";

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			getFollowingUsers({
				userName: privateProfile.userName,
				page,
				limit,
				search,
			}),
		);

		return () => dispatch(resetUserActionState());
	}, [dispatch, limit, page, privateProfile.userName, search]);

	useEffect(() => {
		// if (isCommentUpdateSuccess) toast.success('Successfully updated.');
		if (isError) toast.error("Something went wrong.");

		return () => dispatch(resetUserCommonState());
	}, [dispatch, isError]);

	const navigateToUserProfilePage = (rowIndex) => {
		const { following } = followings[rowIndex];
		navigate(`/user/${following.userName}`);
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Followers"
				data={followings}
				columns={followTableColumns(navigateToUserProfilePage, key)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					followingsMetaData,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default FollowingsDetails;
