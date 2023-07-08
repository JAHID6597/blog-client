import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { createBlog, resetBlogState } from "../../features/blog/blog.slice";
import BlogForm from "./blog-form";
import validation from "./validation";
import { encodeHtmlEntity } from "../../utils/html-entity";
import truncate from "../../utils/truncate";

const CreateBlogForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { blog, isError, isUpdateSuccess, isLoading, message } = useSelector(
		(state) => state.blog,
	);
	const [touched, setTouched] = useState({
		title: false,
		tags: false,
		categories: false,
		content: false,
		cardImage: false,
		bannerImage: false,
	});

	const [formData, setFormData] = useState({
		title: "",
		tags: [],
		categories: [],
		content: "",
		cardImage: "",
		bannerImage: "",
	});
	const [content, setContent] = useState(() => EditorState.createEmpty());
	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		if (isError) alert(message);

		if (isUpdateSuccess) navigate(`/blog/${blog.slug}`, { replace: true });

		return () => dispatch(resetBlogState());
	}, [blog.slug, dispatch, isError, isUpdateSuccess, message, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const allTouched = {
			title: true,
			tags: true,
			categories: true,
			content: true,
			cardImage: true,
			bannerImage: true,
		};
		setTouched(allTouched);
		setErrorMessage(validation(allTouched, formData, setSubmit));

		const newFormData = {
			...formData,
			content: encodeHtmlEntity(formData.content),
			searchContent: truncate(formData.content),
		};

		if (isSubmit) dispatch(createBlog(newFormData));
	};

	return (
		<BlogForm
			name="Create"
			touched={touched}
			setTouched={setTouched}
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
			formData={formData}
			setFormData={setFormData}
			content={content}
			setContent={setContent}
			setSubmit={setSubmit}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
		/>
	);
};

export default CreateBlogForm;
