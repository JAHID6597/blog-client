import React from "react";
import { Comment, Details, Edit, Lock, Pages, SaveAs, Settings } from "@mui/icons-material";

import DashboardLayout from "./dashboard-layout/dashboard-Layout";
import { userDashboardIconColor } from "../config/style.config";


const UserDashboardLayout = ({ privateProfile, background, children }) => {
	const userDashboardMenu = [
		{
			id: "udm1",
			title: "Account Settings",
			icon: <Settings sx={{ color: userDashboardIconColor }} />,
			url: "#",
			children: [
				{
					id: "udm1sm1",
					title: "Update Profile",
					icon: <Edit sx={{ color: userDashboardIconColor }} />,
					url: "/user/profile/update",
				},
				{
					id: "udm1sm2",
					title: "Change Password",
					icon: <Lock sx={{ color: userDashboardIconColor }} />,
					url: "/user/password/change",
				}
			]
		},
		{
			id: "udm2",
			title: "Blog",
			icon: <Pages sx={{ color: userDashboardIconColor }} />,
			url: "#",
			children: [
				{
					id: "udm2sm1",
					title: "All Blogs",
					icon: <Details sx={{ color: userDashboardIconColor }} />,
					url: "/user/blogs",
				},
				{
					id: "udm2sm2",
					title: "Create A New Blog",
					icon: <SaveAs sx={{ color: userDashboardIconColor }} />,
					url: "/user/blog/create",
				}
			]
		},
		{
			id: "udm3",
			title: "Comment",
			icon: <Comment sx={{ color: userDashboardIconColor }} />,
			url: "/user/comments",
			children: []
		}
	];

	return (
		<DashboardLayout type="user" privateProfile={privateProfile} dashboardMenu={userDashboardMenu} background={background}>
			{children}
		</DashboardLayout>
	);
};

export default UserDashboardLayout;
