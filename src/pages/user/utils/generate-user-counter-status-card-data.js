import {
	Bookmark,
	Comment,
	GroupAdd,
	GroupAddOutlined,
	Pages,
	ThumbUp,
} from "@mui/icons-material";

export const generateUserCounterStatusCardData = (userProfile) => {
	return [
		{
			id: "ucsc1",
			icon: Pages,
			title: "Blogs",
			count: userProfile.blogs.length,
		},
		{
			id: "ucsc2",
			icon: Comment,
			title: "Comments",
			count: userProfile.comments.length,
		},
		{
			id: "ucsc3",
			icon: ThumbUp,
			title: "Liked",
			count: userProfile.likedBlogs.length,
		},
		{
			id: "ucsc4",
			icon: Bookmark,
			title: "Bookmarked",
			count: userProfile.bookmarkedBlogs.length,
		},
		{
			id: "ucsc5",
			icon: GroupAddOutlined,
			title: "Followers",
			count: userProfile.followers.length,
		},
		{
			id: "ucsc6",
			icon: GroupAdd,
			title: "Followings",
			count: userProfile.followings.length,
		},
	];
};
