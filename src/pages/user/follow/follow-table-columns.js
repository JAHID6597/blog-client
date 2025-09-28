import { Button } from "@mui/material";
import moment from "moment";

const followTableColumns = (navigateToUserProfilePage, key, unFollowUser) =>
	[
		{
			name: key + ".userName",
			label: "User Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: key + ".email",
			label: "Email",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: key + ".firstName",
			label: "First Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: key + ".lastName",
			label: "Last Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: key + ".blogs",
			label: "Blogs",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) =>
					value?.length,
			},
		},
		{
			name: key + ".likedBlogs",
			label: "Likes",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) =>
					value?.length,
			},
		},
		{
			name: key + ".comments",
			label: "Comments",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) =>
					value?.length,
			},
		},
		{
			name: key + ".bookmarkedBlogs",
			label: "Bookmarks",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) =>
					value?.length,
			},
		},
		{
			name: key + ".createdAt",
			label: "Since",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) =>
					moment(value, "YYYYMMDD").fromNow(),
			},
		},
		{
			name: "userProfileLink",
			label: "Visit",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) => (
					<Button
						onClick={() =>
							navigateToUserProfilePage(tableMeta.rowIndex)
						}
						variant="contained"
						color="primary"
						size="small"
						sx={{ "&:hover": { color: "#fff" } }}
						disableElevation
					>
						visit profile
					</Button>
				),
			},
		},
		key === "following" && {
			name: "Action",
			label: "Action",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value, tableMeta, updateValue) => (
					<Button
						onClick={() => unFollowUser(tableMeta.rowIndex)}
						variant="contained"
						color="success"
						size="small"
						sx={{ "&:hover": { color: "#fff" } }}
						disableElevation
					>
						unfollow
					</Button>
				),
			},
		},
	].filter(Boolean);

export default followTableColumns;
