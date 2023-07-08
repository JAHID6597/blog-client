import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import options from "../../../config/table/options.config";
import {
	getLikedBlogsByPrivateUser,
	likeBlog,
	resetBlogCommonState,
	resetUserLikedBlogState,
} from "../../../features/blog/blog.slice";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import likedBlogsTableColumns from "./liked-blogs-table-columns";

const LikedBlogsDetails = () => {
	const {
		likedBlogsByPrivateUser,
		likedBlogsMetaDataByPrivateUser,
		isLoading,
		isError,
		isUpdateSuccess,
	} = useSelector((state) => state.blog);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLikedBlogsByPrivateUser({ page, limit, search }));

		return () => dispatch(resetUserLikedBlogState());
	}, [dispatch, limit, page, search]);

	useEffect(() => {
		if (isUpdateSuccess) toast.success("Successfully unliked.");
		if (isError) toast.error("Something went wrong.");

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isError, isUpdateSuccess]);

	const unLikeBlog = (rowIndex) => {
		const { blog } = likedBlogsByPrivateUser[rowIndex];
		dispatch(likeBlog(blog.slug));
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Liked Blogs"
				data={likedBlogsByPrivateUser}
				columns={likedBlogsTableColumns(unLikeBlog)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					likedBlogsMetaDataByPrivateUser,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default LikedBlogsDetails;
