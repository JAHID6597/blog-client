import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getPrivateProfile, resetState } from "../../features/admin/admin.slice";
import FullPageLoading from "../common/full-page-loading";

const UnauthenticatedAdminOutletRoute = () => {
	const { admin, privateProfile: adminPrivateProfile, isLoading } = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (admin)
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error) localStorage.removeItem(process.env.REACT_APP_AUTH_ADMIN_KEY);
				else navigate("/admin/dashboard", { replace: true });
			});
		
		return () => dispatch(resetState());
	}, [dispatch, navigate, admin]);

	if (admin && isLoading) return <FullPageLoading />;

	return !admin || !adminPrivateProfile ? <Outlet /> : <Navigate to="/admin/dashboard" replace />;
};

export default UnauthenticatedAdminOutletRoute;
