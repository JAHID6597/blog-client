import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	getComment,
	resetBlogCommentState,
	resetBlogCommonState,
	updateComment,
} from "../../features/blog/blog.slice";
import CommentForm from "./comment-form";

const UpdateCommentForm = () => {
	const { slug, id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { comment, isError, isCommentUpdateSuccess, isLoading, message } =
		useSelector((state) => state.blog);
	const [touched, setTouched] = useState({ comment: true });
	const [formData, setFormData] = useState({ comment: "" });
	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		if (slug && id) dispatch(getComment({ slug, id }));

		return () => dispatch(resetBlogCommentState());
	}, [dispatch, id, navigate, slug]);

	useEffect(() => {
		if (!slug && !id && isError) navigate("/404");
		else if (isError) toast.error(message);

		if (isCommentUpdateSuccess) toast.success("Successfully updated.");

		return () => dispatch(resetBlogCommonState());
	}, [
		dispatch,
		id,
		isError,
		isCommentUpdateSuccess,
		message,
		navigate,
		slug,
	]);

	useEffect(() => {
		setFormData((prevFormData) => {
			return { ...prevFormData, ...comment };
		});
	}, [comment]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSubmit) dispatch(updateComment({ formData, slug, id }));
	};

	return (
		<CommentForm
			name="Update"
			touched={touched}
			setTouched={setTouched}
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
			formData={formData}
			setFormData={setFormData}
			setSubmit={setSubmit}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
		/>
	);
};

export default UpdateCommentForm;
