const validation = (touched, formData, setSubmit, isSignup) => {
	const error = { firstName: "", lastName: "", userName: "", email: "" };
	let isSubmit = true;

	const mailFormat =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordFormat =
		/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;

	if (touched.userName && !formData.userName) {
		error.userName = "User name is not empty.";
		isSubmit = false;
	}

	if (touched.email) {
		if (!formData.email) {
			error.email = "Email is not empty";
			isSubmit = false;
		} else if (!mailFormat.test(formData.email)) {
			error.email = "Invalid email address";
			isSubmit = false;
		}
	}

	if (touched.password) {
		if (!formData.password) {
			error.password = "Password is not empty";
			isSubmit = false;
		} else if (!passwordFormat.test(formData.password) && isSignup) {
			error.password =
				"Password must be at least 8 characters or longer with 1 uppercase, 1 lowercase, 1 numeric and 1 special character like @$!%*";
			isSubmit = false;
		}
	}

	if (touched.confirmPassword) {
		if (!formData.confirmPassword) {
			error.confirmPassword = "Confirm password is not empty";
			isSubmit = false;
		} else if (
			touched.password &&
			formData.password !== formData.confirmPassword
		) {
			error.confirmPassword = "Password must match";
			isSubmit = false;
		}
	}

	setSubmit(isSubmit);
	return error;
};

export default validation;
