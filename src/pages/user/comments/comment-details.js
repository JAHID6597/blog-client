import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import options from "../../../config/table/options.config";
import MuiDataTableLayout from "../../../layout/mui-data-table-layout";
import { useNavigate } from "react-router-dom";
import { getCommentsByPrivateUser, resetUserCommentState, resetBlogCommonState, deleteComment, updateComment } from "../../../features/blog/blog.slice";
import commentsTableColumns from "./comment-table-columns";


const CommentDetails = () => {
	const { privateUserComments, privateUserCommentsMetaData, isLoading, isUpdateSuccess, isError } = useSelector((state) => state.blog);

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
		if (isUpdateSuccess) toast.success('Successfully updated.');
		if (isError) toast.error('Something went wrong.');

		return () => dispatch(resetBlogCommonState());
	 }, [dispatch, isError, isUpdateSuccess]);

	const handleActiveComment = rowIndex => {
		const { isActive, blog, _id } = privateUserComments[rowIndex];
		handleUpdate({ isActive: !isActive }, blog.slug, _id);
	}

	const handleDeleteComment = rowIndex => {
		const { blog, _id } = privateUserComments[rowIndex];
		handleDelete(blog.slug, _id);
	}

	const navigateToBlogUpdatePage = rowIndex => {
		const { slug } = privateUserComments[rowIndex];
		navigate(`/user/blog/${slug}/update`);
	}

	const handleUpdate = (formData, slug, id) => {
		dispatch(updateComment({formData, slug, id})).then(d => console.log(d));
	}

	const handleDelete = (slug, id) => {
		dispatch(deleteComment({ slug, id }));
	}

	return (
		<MuiDataTableLayout>
			<MUIDataTable
				title="Comments"
				data={privateUserComments}
				columns={commentsTableColumns(navigateToBlogUpdatePage, handleActiveComment, handleDeleteComment)}
				options={options(page, setPage, limit, setLimit, setSearch, isLoading, privateUserCommentsMetaData)}
			/>
		</MuiDataTableLayout>
	);
};


export default CommentDetails;