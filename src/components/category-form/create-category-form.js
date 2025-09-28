import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCategory } from "../../features/admin/category/category.slice";
import CategoryForm from "./category-form";
import validation from "./validation";

const CreateCategoryForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isError, isUpdateSuccess, isLoading, message } = useSelector(
		(state) => state.adminCategory,
	);
	const [touched, setTouched] = useState({
		name: false,
		description: false,
		image: false,
	});
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		image: "",
	});

	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isUpdateSuccess) navigate("/admin/categories");
	}, [isError, isUpdateSuccess, message, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const allTouched = { name: true, description: true };
		setTouched(allTouched);
		setErrorMessage(validation(allTouched, formData, setSubmit));

		console.log(formData);

		if (isSubmit) dispatch(createCategory(formData));
	};

	return (
		<CategoryForm
			type="Create"
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

export default CreateCategoryForm;
