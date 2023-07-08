import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const getTag = async (slug) => {
	const { data } = await axios.get(`${baseURL}/api/tag/${slug}`);

	return data;
};

const getTags = async (page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/tags?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const tagService = { getTag, getTags };

export default tagService;
