import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;
const authUserKey = process.env.REACT_APP_AUTH_USER_KEY;

const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const signUp = async (formData) => {
	const { data } = await axios.post(`${baseURL}/api/user/signup`, formData);

	if (data) localStorage.setItem(authUserKey, JSON.stringify(data));

	return data;
};

const signIn = async (formData) => {
	const { data } = await axios.post(`${baseURL}/api/user/signin`, formData);

	if (data) localStorage.setItem(authUserKey, JSON.stringify(data));

	return data;
};

const logout = async (token) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/logout`,
		config(token),
	);

	if (data) localStorage.removeItem(authUserKey);

	return data;
};

const getPublicProfile = async (userName) => {
	const { data } = await axios.get(`${baseURL}/api/user/${userName}`);

	return data;
};

const getPrivateProfile = async (token) => {
	const { data } = await axios.get(`${baseURL}/api/user`, config(token));

	return data;
};

const updateProfile = async (formData, token) => {
	const { data } = await axios.put(
		`${baseURL}/api/user`,
		formData,
		config(token),
	);

	return data;
};

const deleteProfile = async (token) => {
	const { data } = await axios.delete(`${baseURL}/api/user`, config(token));

	if (data) localStorage.removeItem(authUserKey);

	return data;
};

const changePassword = async (formData, token) => {
	const { data } = await axios.patch(
		`${baseURL}/api/user/change-password`,
		formData,
		config(token),
	);

	return data;
};

const followUser = async (userName, token) => {
	const { data } = await axios.post(
		`${baseURL}/api/user/${userName}/follow`,
		{},
		config(token),
	);

	return data;
};

const getFollowerUsers = async (userName, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/followers?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getFollowingUsers = async (userName, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/followings?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const userService = {
	signUp,
	signIn,
	logout,
	getPublicProfile,
	getPrivateProfile,
	updateProfile,
	deleteProfile,
	changePassword,
	followUser,
	getFollowerUsers,
	getFollowingUsers,
};

export default userService;
