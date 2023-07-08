import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { toast } from "react-toastify";
import {
	getBlogByPrivateUser,
	resetBlogCommonState,
	resetUserBlogState,
	updateBlog,
} from "../../features/blog/blog.slice";
import BlogForm from "./blog-form";
import { decodeHtmlEntity, encodeHtmlEntity } from "../../utils/html-entity";
import truncate from "../../utils/truncate";

const UpdateBlogForm = () => {
	const { slug } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { blogByPrivateUser, isError, isUpdateSuccess, isLoading, message } =
		useSelector((state) => state.blog);
	const [touched, setTouched] = useState({
		title: true,
		tags: true,
		categories: true,
		content: true,
		cardImage: true,
		bannerImage: true,
	});
	const [formData, setFormData] = useState({
		title: "",
		tags: [],
		categories: [],
		content: "",
		cardImage: "",
		bannerImage: "",
	});
	const [content, setContent] = useState(() =>
		EditorState.createWithContent(
			ContentState.createFromBlockArray(convertFromHTML("")),
		),
	);
	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		if (slug) dispatch(getBlogByPrivateUser(slug));

		return () => dispatch(resetUserBlogState());
	}, [dispatch, navigate, slug]);

	useEffect(() => {
		if (!blogByPrivateUser?.slug && isError) navigate("/404");
		else if (isError) toast.error(message);

		if (isUpdateSuccess) navigate(`/blog/${blogByPrivateUser.slug}`);

		return () => dispatch(resetBlogCommonState());
	}, [
		blogByPrivateUser.slug,
		dispatch,
		isError,
		isUpdateSuccess,
		message,
		navigate,
	]);

	useEffect(() => {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				...blogByPrivateUser,
				content: decodeHtmlEntity(blogByPrivateUser.content),
			};
		});

		setContent(
			blogByPrivateUser.content
				? () =>
						EditorState.createWithContent(
							ContentState.createFromBlockArray(
								convertFromHTML(
									decodeHtmlEntity(blogByPrivateUser.content),
								),
							),
						)
				: () =>
						EditorState.createWithContent(
							ContentState.createFromBlockArray(
								convertFromHTML("<p> </p>"),
							),
						),
		);
	}, [blogByPrivateUser]);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
		const updatedFormData = {
			...formData,
			content: encodeHtmlEntity(formData.content),
			searchContent: truncate(formData.content),
		};

		if (isSubmit) dispatch(updateBlog({ formData: updatedFormData, slug }));
	};

	return (
		<BlogForm
			name="Update"
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

export default UpdateBlogForm;
