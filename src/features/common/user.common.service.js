import decode from "jwt-decode";

const authUserKey = process.env.REACT_APP_AUTH_USER_KEY;
const user = JSON.parse(localStorage.getItem(authUserKey));

export const userTimeOut = () => {
	if (user?.accessToken) {
		if (decode(user?.accessToken).exp * 1000 < new Date().getTime()) {
			localStorage.removeItem(authUserKey);
		}
	}
};
