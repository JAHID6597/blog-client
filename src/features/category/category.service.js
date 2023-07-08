import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const getCategory = async (slug) => {
	const { data } = await axios.get(`${baseURL}/api/category/${slug}`);

	return data;
};

const getCategories = async (page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/categories?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const categoryService = { getCategory, getCategories };

export default categoryService;
