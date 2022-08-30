import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPrivateProfile, resetState } from "../../features/admin/admin.slice";
import AdminDashboardLayout from "../../layout/admin-dashboard-layout";


const PrivateAdminOutletRoute = () => {
	const { admin, privateProfile: adminPrivateProfile } = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!admin) navigate("/admin/auth", { replace: true });
		else {
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error) {
					localStorage.removeItem(process.env.REACT_APP_AUTH_ADMIN_KEY);
					navigate("/admin/auth", { replace: true });
				}
			});
		}

		return () => dispatch(resetState());
	}, [dispatch, navigate, admin]);

	return admin ? adminPrivateProfile ? <Outlet /> : <AdminDashboardLayout privateProfile={adminPrivateProfile} /> : '';
};


export default PrivateAdminOutletRoute;
