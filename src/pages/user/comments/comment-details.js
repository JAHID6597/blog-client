import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import options from "../../../config/table/options.config";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import { useNavigate } from "react-router-dom";
import {
	getCommentsByPrivateUser,
	resetUserCommentState,
	resetBlogCommonState,
	deleteComment,
	updateComment,
} from "../../../features/blog/blog.slice";
import commentsTableColumns from "./comment-table-columns";

const CommentDetails = () => {
	const {
		privateUserComments,
		privateUserCommentsMetaData,
		isLoading,
		isCommentUpdateSuccess,
		isCommentDeleteSuccess,
		isError,
	} = useSelector((state) => state.blog);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getCommentsByPrivateUser({ page, limit, search }));

		return () => dispatch(resetUserCommentState());
	}, [dispatch, limit, page, search]);

	useEffect(() => {
		if (isCommentUpdateSuccess) toast.success("Successfully Updated.");
		if (isCommentDeleteSuccess) toast.success("Successfully Deleted.");
		if (isError) toast.error("Something Went Wrong.");

		return () => dispatch(resetBlogCommonState());
	}, [dispatch, isError, isCommentUpdateSuccess, isCommentDeleteSuccess]);

	const handleActiveComment = (rowIndex) => {
		const { isActive, blog, _id } = privateUserComments[rowIndex];

		handleUpdate({ isActive: !isActive }, blog.slug, _id);
	};

	const handleDeleteComment = (rowIndex) => {
		const { blog, _id } = privateUserComments[rowIndex];

		handleDelete(blog.slug, _id);
	};

	const navigateToBlogUpdatePage = (rowIndex) => {
		const { blog, _id } = privateUserComments[rowIndex];

		navigate(`/user/blog/${blog.slug}/comment/${_id}/update`);
	};

	const handleUpdate = (formData, slug, id) => {
		dispatch(updateComment({ formData, slug, id }));
	};

	const handleDelete = (slug, id) => {
		dispatch(deleteComment({ slug, id }));
	};

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Comments"
				data={privateUserComments}
				columns={commentsTableColumns(
					navigateToBlogUpdatePage,
					handleActiveComment,
					handleDeleteComment,
				)}
				options={options(
					page,
					setPage,
					limit,
					setLimit,
					setSearch,
					isLoading,
					privateUserCommentsMetaData,
				)}
			/>
		</MuiDataTableLayout>
	);
};

export default CommentDetails;
