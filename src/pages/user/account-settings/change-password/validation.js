const validation = (touched, formData, setSubmit) => {
	const error = { currentPassword: "", newPassword: "", confirmPassword: "" };
	let isSubmit = true;

	const passwordFormat =
		/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;

	if (touched.currentPassword && !formData.currentPassword) {
		error.currentPassword = "Current password is not empty";
		isSubmit = false;
	}

	if (touched.newPassword) {
		if (!formData.newPassword) {
			error.newPassword = "Password is not empty";
			isSubmit = false;
		} else if (!passwordFormat.test(formData.newPassword)) {
			error.newPassword =
				"Password must be at least 8 characters or longer with 1 uppercase, 1 lowercase, 1 numeric and 1 special character like @$!%*";
			isSubmit = false;
		}
	}

	if (
		touched.newPassword &&
		touched.confirmPassword &&
		formData.newPassword !== formData.confirmPassword
	) {
		error.confirmPassword = "Password must match";
		isSubmit = false;
	}

	setSubmit(isSubmit);
	return error;
};

export default validation;
