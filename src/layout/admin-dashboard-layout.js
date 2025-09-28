import React from "react";
import DashboardLayout from "./dashboard-layout/dashboard-Layout";
import { generateAdminDashboardMenu } from "./utils/generate-admin-dashboard-menu";

const AdminDashboardLayout = ({ privateProfile, children }) => {
	const adminDashboardMenu = generateAdminDashboardMenu();

	return (
		<DashboardLayout
			type="admin"
			privateProfile={privateProfile}
			dashboardMenu={adminDashboardMenu}
		>
			{children}
		</DashboardLayout>
	);
};

export default AdminDashboardLayout;
