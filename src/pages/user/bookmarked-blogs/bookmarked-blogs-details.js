import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import options from "../../../config/table/options.config";
import {
	bookmarkBlog,
	getBookmarkedBlogsByPrivateUser,
	resetBlogCommonState,
	resetUserBookmarkedBlogState,
} from "../../../features/blog/blog.slice";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import bookmarkedBlogsTableColumns from "./bookmarked-blogs-table-columns";

const BookmarkedBlogsDetails = () => {
	const {
		bookmarkedBlogsByPrivateUser,
		bookmarkedBlogsMetaDataByPrivateUser,
		isLoading,
		isError,
		isUpdateSuccess,
	} = useSelector((state) => state.blog);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBookmarkedBlogsByPrivateUser({ page, limit, search }));

		return () => dispatch(resetUserBookmarkedBlogState());
	}, [dispatch, limit, page, search]);

	useEffect(() => {
		if (isUpdateSuccess)
			toast.success("Successfully Removed From Bookmark.");
		if (isError) toast.error("Something went wrong.");

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isError, isUpdateSuccess]);

	const unBookmarkBlog = (rowIndex) => {
		const { blog } = bookmarkedBlogsByPrivateUser[rowIndex];
		dispatch(bookmarkBlog(blog.slug));
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Bookmarked Blogs"
				data={bookmarkedBlogsByPrivateUser}
				columns={bookmarkedBlogsTableColumns(unBookmarkBlog)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					bookmarkedBlogsMetaDataByPrivateUser,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default BookmarkedBlogsDetails;
