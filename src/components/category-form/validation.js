const validation = (touched, formData, setSubmit) => {
	const error = { name: "", description: "" };
	let isSubmit = true;

	if (!touched.name || !touched.description) isSubmit = false;

	if (touched.name && !formData.name) {
		error.name = "Category Name is not empty.";
		isSubmit = false;
	}

	if (touched.description && !formData.description) {
		error.description = "Description is not empty.";
		isSubmit = false;
	}

	setSubmit(isSubmit);
	return error;
};

export default validation;
