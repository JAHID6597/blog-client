import React from "react";

import DashboardLayout from "./dashboard-layout/dashboard-Layout";
import { generateUserDashboardMenu } from "./utils/generate-user-dashboard-menu";

const UserDashboardLayout = ({ privateProfile, children }) => {
	const userDashboardMenu = generateUserDashboardMenu();

	return (
		<DashboardLayout
			type="user"
			privateProfile={privateProfile}
			dashboardMenu={userDashboardMenu}
		>
			{children}
		</DashboardLayout>
	);
};

export default UserDashboardLayout;
