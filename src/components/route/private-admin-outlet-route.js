import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
	getPrivateProfile,
	resetUserPrivateState,
} from "../../features/admin/admin.slice";
import AdminDashboardLayout from "../../layout/admin-dashboard-layout";

const PrivateAdminOutletRoute = () => {
	const {
		admin,
		privateProfile: adminPrivateProfile,
		isPrivateProfileError,
	} = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!admin || isPrivateProfileError)
			navigate("/admin/auth", { replace: true });
	}, [admin, isPrivateProfileError, navigate]);

	useEffect(() => {
		if (admin)
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error) {
					localStorage.removeItem(
						process.env.REACT_APP_AUTH_ADMIN_KEY,
					);
				}
			});

		return () => dispatch(resetUserPrivateState());
	}, [admin, dispatch]);

	return admin ? (
		<AdminDashboardLayout privateProfile={adminPrivateProfile}>
			{adminPrivateProfile && <Outlet />}
		</AdminDashboardLayout>
	) : (
		""
	);
};

export default PrivateAdminOutletRoute;
