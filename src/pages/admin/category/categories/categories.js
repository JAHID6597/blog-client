import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import options from "../../../../config/table/options.config";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboardLayout from "../../../../layout/admin-dashboard-layout";
import { getCategories, resetState } from "../../../../features/admin/category/category.slice";
import { useNavigate } from "react-router-dom";
import MuiDataTableLayout from "../../../../layout/mui-data-table-layout";
import categoryTableColumns from "./category-table-columns";

const Categories = () => {
	const { privateProfile } = useSelector((state) => state.admin);
	const { categories, isLoading } = useSelector((state) => state.adminCategory);

	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories({ page, limit, search }));

		return () => dispatch(resetState());
	}, [dispatch, limit, page, search]);

	const handleDeleteCategory = slug => {
		console.log(slug)
	}
	
	return (
		<AdminDashboardLayout privateProfile={privateProfile}>
			<MuiDataTableLayout>
				<MUIDataTable
					title="Categories"
					data={categories}
					columns={categoryTableColumns(categories, navigate, handleDeleteCategory)}
					options={options(setPage, setLimit, setSearch, isLoading)}
				/>
				</MuiDataTableLayout>
		</AdminDashboardLayout>
	);
};

export default Categories;
