import decode from "jwt-decode";

const authAdminKey = process.env.REACT_APP_AUTH_ADMIN_KEY;
const admin = JSON.parse(localStorage.getItem(authAdminKey));

export const adminTimeOut = () => {
	if (admin?.accessToken) {
		if (decode(admin?.accessToken).exp * 1000 < new Date().getTime()) {
			localStorage.removeItem(authAdminKey);
		}
	}
};
