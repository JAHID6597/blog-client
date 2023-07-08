import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
	getPrivateProfile,
	resetUserPrivateState,
} from "../../features/user/user.slice";
import UserDashboardLayout from "../../layout/user-dashboard-layout";

const PrivateUserOutletRoute = () => {
	const {
		user,
		privateProfile: userPrivateProfile,
		isPrivateProfileError,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || isPrivateProfileError)
			navigate("/user/signin", { replace: true });
	}, [isPrivateProfileError, navigate, user]);

	useEffect(() => {
		if (user)
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error)
					localStorage.removeItem(
						process.env.REACT_APP_AUTH_USER_KEY,
					);
			});

		return () => dispatch(resetUserPrivateState());
	}, [dispatch, user]);

	return user ? (
		<UserDashboardLayout privateProfile={userPrivateProfile}>
			{userPrivateProfile && <Outlet />}
		</UserDashboardLayout>
	) : (
		""
	);
};

export default PrivateUserOutletRoute;
