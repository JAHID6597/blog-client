import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;
const authAdminKey = process.env.REACT_APP_AUTH_ADMIN_KEY;

const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const signIn = async (formData) => {
	const { data } = await axios.post(`${baseURL}/api/admin/signin`, formData);

	if (data) localStorage.setItem(authAdminKey, JSON.stringify(data));

	return data;
};

const logout = async (token) => {
	const { data } = await axios.get(
		`${baseURL}/api/admin/logout`,
		config(token),
	);

	if (data) localStorage.removeItem(authAdminKey);

	return data;
};

const getPrivateProfile = async (token) => {
	const { data } = await axios.get(`${baseURL}/api/admin`, config(token));

	return data;
};

const updateProfile = async (formData, token) => {
	const { data } = await axios.put(
		`${baseURL}/api/admin`,
		formData,
		config(token),
	);

	return data;
};

const deleteProfile = async (token) => {
	const { data } = await axios.delete(`${baseURL}/api/admin`, config(token));

	if (data) localStorage.removeItem(authAdminKey);

	return data;
};

const adminAuthService = {
	signIn,
	logout,
	getPrivateProfile,
	updateProfile,
	deleteProfile,
};

export default adminAuthService;
