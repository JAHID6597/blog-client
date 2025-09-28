import {
	Category,
	Details,
	Edit,
	ListSharp,
	Lock,
	Pages,
	Settings,
	Widgets,
	PeopleAlt,
	People,
} from "@mui/icons-material";
import { adminDashboardIconColor } from "../../config/style.config";

export const generateAdminDashboardMenu = () => [
	{
		id: "adm1",
		title: "Account Settings",
		icon: <Settings sx={{ color: adminDashboardIconColor }} />,
		url: "#",
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
			},
		],
	},
	{
		id: "adm2",
		title: "Admin User",
		icon: <PeopleAlt sx={{ color: adminDashboardIconColor }} />,
		url: "#",
		children: [
			{
				id: "adm2sm1",
				title: "All Users",
				icon: <Details sx={{ color: adminDashboardIconColor }} />,
				url: "/admin/admin-users",
			},
		],
	},
	{
		id: "adm3",
		title: "User",
		icon: <People sx={{ color: adminDashboardIconColor }} />,
		url: "#",
		children: [
			{
				id: "adm3sm1",
				title: "All Users",
				icon: <Details sx={{ color: adminDashboardIconColor }} />,
				url: "/admin/users",
			},
		],
	},
	{
		id: "adm4",
		title: "Blog",
		icon: <Pages sx={{ color: adminDashboardIconColor }} />,
		url: "#",
		children: [
			{
				id: "adm4sm1",
				title: "All Blogs",
				icon: <Details sx={{ color: adminDashboardIconColor }} />,
				url: "/admin/blogs",
			},
		],
	},
	{
		id: "adm5",
		title: "Category",
		icon: <Category sx={{ color: adminDashboardIconColor }} />,
		url: "#",
		children: [
			{
				id: "adm5sm1",
				title: "All Categories",
				icon: <ListSharp sx={{ color: adminDashboardIconColor }} />,
				url: "/admin/categories",
			},
			{
				id: "adm5sm2",
				title: "Create A New Category",
				icon: <Widgets sx={{ color: adminDashboardIconColor }} />,
				url: "/admin/category/create",
			},
		],
	},
];
