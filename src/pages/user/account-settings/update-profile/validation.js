const validation = (touched, formData, setSubmit) => {
	const error = { firstName: "", lastName: "", userName: "", email: "" };
	let isSubmit = true;

	const mailFormat =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const onlyLetterFormat = /^[A-Za-z]+$/;

	if (touched.firstName) {
		if (formData.firstName.length < 3) {
			error.firstName = "First name must be atleast 3 characters long.";
			isSubmit = false;
		} else if (!onlyLetterFormat.test(formData.firstName)) {
			error.firstName = "Invalid first name.";
			isSubmit = false;
		}
	}

	if (touched.lastName) {
		if (formData.lastName.length < 3) {
			error.lastName = "Last name must be atleast 3 characters long.";
			isSubmit = false;
		} else if (!onlyLetterFormat.test(formData.lastName)) {
			error.lastName = "Invalid last name.";
			isSubmit = false;
		}
	}

	if (touched.userName) {
		if (!formData.userName) {
			error.userName = "User name is not empty.";
			isSubmit = false;
		} else if (formData.userName.length < 3) {
			error.userName = "User name must be atleast 3 characters long.";
			isSubmit = false;
		} else if (!onlyLetterFormat.test(formData.userName)) {
			error.userName = "Invalid user name.";
			isSubmit = false;
		}
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

	setSubmit(isSubmit);
	return error;
};

export default validation;
