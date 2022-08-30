import React from "react";
import { Category, Details, Edit, ListSharp, Lock, Pages, Settings, Widgets } from "@mui/icons-material";
import DashboardLayout from "./dashboard-layout/dashboard-Layout";
import { adminDashboardIconColor } from "../config/style.config";

const AdminDashboardLayout = ({ privateProfile, children }) => {
	const adminDashboardMenu = [
		{
			id: "adm1",
			title: "Account Settings",
			icon: <Settings sx={{ color: adminDashboardIconColor }} />,
			url: "",
			children: [
				{
					id: "adm1sm1",
					title: "Update Profile",
					icon: <Edit sx={{ color: adminDashboardIconColor }} />,
					url: "/admin/profile/update",
				},
				{
					id: "adm1sm2",
					title: "Change Password",
					icon: <Lock sx={{ color: adminDashboardIconColor }} />,
					url: "/admin/password/change",
				}
			]
		},
		{
			id: "adm2",
			title: "User",
			icon: <Pages sx={{ color: adminDashboardIconColor }} />,
			url: "",
			children: [
				{
					id: "adm2sm1",
					title: "All Users",
					icon: <Details sx={{ color: adminDashboardIconColor }} />,
					url: "/admin/users",
				}
			]
		},
		{
			id: "adm3",
			title: "Blog",
			icon: <Pages sx={{ color: adminDashboardIconColor }} />,
			url: "",
			children: [
				{
					id: "adm3sm1",
					title: "All Blogs",
					icon: <Details sx={{ color: adminDashboardIconColor }} />,
					url: "/admin/blogs",
				}
			]
		},
		{
			id: "adm4",
			title: "Category",
			icon: <Category sx={{ color: adminDashboardIconColor }} />,
			url: "",
			children: [
				{
					id: "adm4sm1",
					title: "All Categories",
					icon: <ListSharp sx={{ color: adminDashboardIconColor }} />,
					url: "/admin/categories",
				},
				{
					id: "adm4sm2",
					title: "Create A New Category",
					icon: <Widgets sx={{ color: adminDashboardIconColor }} />,
					url: "/admin/category/create",
				}
			]
		}
	];

	return (
		<DashboardLayout type="admin" privateProfile={privateProfile} dashboardMenu={adminDashboardMenu}>
			{children}
		</DashboardLayout>
	);
};

export default AdminDashboardLayout;
