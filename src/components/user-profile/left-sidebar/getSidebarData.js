import {
	Article,
	Comment,
	GroupAddOutlined,
	GroupAdd,
} from "@mui/icons-material";

export const getOrganizationsData = (user) =>
	[
		(user?.work?.position || user?.work?.organization) && {
			text:
				user?.work?.position +
				`${
					user?.work?.position && user?.work?.organization ? ", " : ""
				}` +
				user?.work?.organization,
		},
	].filter(Boolean);

export const getCurrentlyLearningItems = (user) =>
	user?.learning?.map((item) => {
		return { text: item };
	});

export const getSkillsAndLanguagesItems = (user) =>
	user?.skills?.map((item) => {
		return { text: item };
	});

export const getCurrentlyHackingItems = (user) =>
	user?.hacking?.map((item) => {
		return { text: item };
	});

export const getAvailableItems = (user) =>
	[user?.availability && { text: user?.availability }].filter(Boolean);

export const getProfileMetaInfoItems = (user) => [
	{
		icon: Article,
		text: `${user?.blogs?.length || 0} blog${
			user?.blogs?.length > 1 ? "s" : ""
		} published`,
		url: `/user/${user?.userName}/all-blogs`,
	},
	{
		icon: Comment,
		text: `${user?.comments?.length || 0} comment${
			user?.comments?.length > 1 ? "s" : ""
		} written`,
		url: `/user/${user?.userName}/comments`,
	},
	{
		icon: GroupAddOutlined,
		text: `${user?.followers?.length || 0} follower${
			user?.followers?.length > 1 ? "s" : ""
		}`,
		url: `/user/${user?.userName}/followers`,
	},
	{
		icon: GroupAdd,
		text: `${user?.followings?.length || 0} following${
			user?.followings?.length > 1 ? "s" : ""
		}`,
		url: `/user/${user?.userName}/followings`,
	},
];
