import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;
// const authUserKey = process.env.REACT_APP_AUTH_USER_KEY;

const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const getUsers = async (page, limit, search, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/admin/users?page=${page}&limit=${limit}&search=${search}`,
		config(token),
	);

	return data;
};

const userAuthService = { getUsers };

export default userAuthService;
