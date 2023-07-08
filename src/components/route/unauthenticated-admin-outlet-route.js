import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
	getPrivateProfile,
	resetUserPrivateState,
} from "../../features/admin/admin.slice";

const UnauthenticatedAdminOutletRoute = () => {
	const { admin, privateProfile: adminPrivateProfile } = useSelector(
		(state) => state.admin,
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (admin)
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error)
					localStorage.removeItem(
						process.env.REACT_APP_AUTH_ADMIN_KEY,
					);
				else navigate("/admin/dashboard", { replace: true });
			});

		return () => dispatch(resetUserPrivateState());
	}, [dispatch, navigate, admin]);

	if (admin && adminPrivateProfile)
		return <Navigate to="/admin/dashboard" replace />;

	return !admin && <Outlet />;
};

export default UnauthenticatedAdminOutletRoute;
