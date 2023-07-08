import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import options from "../../../../config/table/options.config";
import { useDispatch, useSelector } from "react-redux";
import {
	getUsers,
	resetState,
} from "../../../../features/admin/user/user.slice";
import AdminDashboardLayout from "../../../../layout/admin-dashboard-layout";
import MuiDataTableLayout from "../../../../layout/mui-data-table-layout";
import userTableColumns from "./user-table-columns";

const Users = () => {
	const { privateProfile } = useSelector((state) => state.admin);
	const { users, isLoading } = useSelector((state) => state.adminUser);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers({ page, limit, search }));

		return () => dispatch(resetState());
	}, [dispatch, limit, page, search]);

	return (
		<AdminDashboardLayout privateProfile={privateProfile}>
			<MuiDataTableLayout>
				<MUIDataTable
					title="Users"
					data={users}
					columns={userTableColumns}
					options={options(setPage, setLimit, setSearch, isLoading)}
				/>
			</MuiDataTableLayout>
		</AdminDashboardLayout>
	);
};

export default Users;
