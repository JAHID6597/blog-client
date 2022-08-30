import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import FullPageLoading from "../common/full-page-loading";
import { getPrivateProfile, resetUserPrivateState } from "../../features/user/user.slice";


const UnauthenticatedUserOutletRoute = () => {
	const { user, privateProfile: userPrivateProfile, isLoading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user)
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error) localStorage.removeItem(process.env.REACT_APP_AUTH_USER_KEY);
				else navigate("/user/dashboard", { replace: true });
			});
		
		return () => dispatch(resetUserPrivateState());
	}, [dispatch, navigate, user]);

	if (user && userPrivateProfile) return <Navigate to="/user/dashboard" replace />;
	if (user && isLoading) return <FullPageLoading />;

	return !user && <Outlet />;
};


export default UnauthenticatedUserOutletRoute;