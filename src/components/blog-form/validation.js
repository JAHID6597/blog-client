const validation = (touched, formData, setSubmit) => {
	const error = {
		title: "",
		tags: "",
		content: "",
		cardImage: "",
		bannerImage: "",
	};
	let isSubmit = true;

	if (
		!touched.title ||
		!touched.tags ||
		!touched.categories ||
		!touched.content ||
		!touched.cardImage ||
		!touched.bannerImage
	)
		isSubmit = false;

	if (touched.title && !formData.title) {
		error.title = "Title is not empty.";
		isSubmit = false;
	}

	if (touched.tags && formData.tags.length < 1) {
		error.tags = "Minimum 1 tag is required.";
		isSubmit = false;
	}

	if (touched.categories && formData.categories.length < 1) {
		error.categories = "Select atleast 1 category.";
		isSubmit = false;
	}

	if (touched.content && !formData.content) {
		error.content = "Content is not empty.";
		isSubmit = false;
	}

	if (touched.cardImage && !formData.cardImage) {
		error.cardImage = "Card Image is not empty.";
		isSubmit = false;
	}

	if (touched.bannerImage && !formData.bannerImage) {
		error.bannerImage = "Banner Image is not empty.";
		isSubmit = false;
	}

	setSubmit(isSubmit);
	return error;
};

export default validation;
