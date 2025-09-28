import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const getCategory = async (slug, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/admin/category/${slug}`,
		config(token),
	);

	return data;
};

const getCategories = async (page, limit, search, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/admin/categories?page=${page}&limit=${limit}&search=${search}`,
		config(token),
	);

	return data;
};

const createCategory = async (formData, token) => {
	const { data } = await axios.post(
		`${baseURL}/api/admin/category`,
		formData,
		config(token),
	);

	return data;
};

const updateCategory = async (formData, slug, token) => {
	const { data } = await axios.put(
		`${baseURL}/api/admin/category/${slug}`,
		formData,
		config(token),
	);

	return data;
};

const deleteCategory = async (slug, token) => {
	const { data } = await axios.delete(
		`${baseURL}/api/admin/category/${slug}`,
		config(token),
	);

	return data;
};

const adminCategoryService = {
	getCategory,
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default adminCategoryService;
