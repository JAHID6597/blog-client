const validation = (touched, formData, setSubmit) => {
	const error = { comment: "" };
	let isSubmit = true;

	if (!touched.comment) isSubmit = false;

	if (touched.comment && !formData.comment) {
		error.title = "Comment body is not empty.";
		isSubmit = false;
	}

	setSubmit(isSubmit);
	return error;
};

export default validation;
