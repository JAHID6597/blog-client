import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getPrivateProfile,
	resetUserPrivateState,
} from "../features/user/user.slice";

const useUserAuth = () => {
	const {
		user,
		privateProfile: userPrivateProfile,
		isLoading,
		isSuccess,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error)
					localStorage.removeItem(
						process.env.REACT_APP_AUTH_USER_KEY,
					);
			});
		}

		return () => dispatch(resetUserPrivateState());
	}, [dispatch, user]);

	return { user, userPrivateProfile, isLoading, isSuccess };
};

export default useUserAuth;
