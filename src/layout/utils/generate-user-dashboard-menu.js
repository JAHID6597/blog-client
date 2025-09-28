import {
	Bookmark,
	Comment,
	Details,
	Edit,
	GroupAdd,
	GroupAddOutlined,
	Lock,
	Pages,
	SaveAs,
	Settings,
	ThumbUp,
} from "@mui/icons-material";
import { userDashboardIconColor } from "../../config/style.config";

export const generateUserDashboardMenu = () => [
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
			},
		],
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
			},
		],
	},
	{
		id: "udm3",
		title: "Comment",
		icon: <Comment sx={{ color: userDashboardIconColor }} />,
		url: "/user/comments",
		children: [],
	},
	{
		id: "udm4",
		title: "Liked Blogs",
		icon: <ThumbUp sx={{ color: userDashboardIconColor }} />,
		url: "/user/liked-blogs",
		children: [],
	},
	{
		id: "udm5",
		title: "Bookmarked Blogs",
		icon: <Bookmark sx={{ color: userDashboardIconColor }} />,
		url: "/user/bookmarked-blogs",
		children: [],
	},
	{
		id: "udm6",
		title: "Followers",
		icon: <GroupAddOutlined sx={{ color: userDashboardIconColor }} />,
		url: "/user/followers",
		children: [],
	},
	{
		id: "udm7",
		title: "Followings",
		icon: <GroupAdd sx={{ color: userDashboardIconColor }} />,
		url: "/user/followings",
		children: [],
	},
];
