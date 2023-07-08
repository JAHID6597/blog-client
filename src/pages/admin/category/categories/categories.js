import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import options from "../../../../config/table/options.config";
import { useNavigate } from "react-router-dom";
import {
	deleteCategory,
	getCategories,
	resetCategoryCommonState,
	resetCategoryState,
} from "../../../../features/admin/category/category.slice";
import MuiDataTableLayout from "../../../../layout/mui-data-table-layout";
import categoryTableColumns from "./category-table-columns";
import { toast } from "react-toastify";

const Categories = () => {
	const {
		categories,
		categoryMetaData,
		isLoading,
		isUpdateSuccess,
		isDeleteSuccess,
		isError,
	} = useSelector((state) => state.adminCategory);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (isUpdateSuccess) toast.success("Successfully Updated.");
		if (isDeleteSuccess) toast.success("Successfully Deleted.");
		if (isError) toast.error("Something Went Wrong.");

		return () => dispatch(resetCategoryCommonState());
	}, [dispatch, isDeleteSuccess, isError, isUpdateSuccess]);

	useEffect(() => {
		dispatch(getCategories({ page, limit, search }));

		return () => dispatch(resetCategoryState());
	}, [dispatch, limit, page, search]);

	const handleDeleteCategory = (slug) => {
		dispatch(deleteCategory(slug));
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Categories"
				data={categories}
				columns={categoryTableColumns(
					categories,
					navigate,
					handleDeleteCategory,
				)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					categoryMetaData,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default Categories;
