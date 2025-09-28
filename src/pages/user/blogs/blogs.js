import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteBlog,
	getBlogsByPrivateUser,
	resetBlogCommonState,
	resetUserBlogState,
	updateBlog,
} from "../../../features/blog/blog.slice";
import options from "../../../config/table/options.config";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import blogsTableColumns from "./blogs-table-columns";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
	const {
		blogsByPrivateUser,
		blogsMetaDataByPrivateUser,
		isLoading,
		isUpdateSuccess,
		isDeleteSuccess,
		isError,
	} = useSelector((state) => state.blog);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getBlogsByPrivateUser({ page, limit, search }));

		return () => dispatch(resetUserBlogState());
	}, [dispatch, limit, page, search]);

	useEffect(() => {
		if (isUpdateSuccess) toast.success("Successfully Updated.");
		if (isDeleteSuccess) toast.success("Successfully Deleted.");
		if (isError) toast.error("Something Went Wrong.");

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isDeleteSuccess, isError, isUpdateSuccess]);

	const handleActiveBlog = (rowIndex) => {
		const { isActive, slug } = blogsByPrivateUser[rowIndex];

		handleUpdate({ isActive: !isActive }, slug);
	};

	const handleDeleteBlog = (rowIndex) => {
		const { slug } = blogsByPrivateUser[rowIndex];
		handleDelete(slug);
	};

	const navigateToBlogUpdatePage = (rowIndex) => {
		const { slug } = blogsByPrivateUser[rowIndex];
		navigate(`/user/blog/${slug}/update`);
	};

	const handleUpdate = (formData, slug) => {
		dispatch(updateBlog({ formData, slug }));
	};

	const handleDelete = (slug) => {
		dispatch(deleteBlog(slug));
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Users"
				data={blogsByPrivateUser}
				columns={blogsTableColumns(
					navigateToBlogUpdatePage,
					handleActiveBlog,
					handleDeleteBlog,
				)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					blogsMetaDataByPrivateUser,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default Blogs;
