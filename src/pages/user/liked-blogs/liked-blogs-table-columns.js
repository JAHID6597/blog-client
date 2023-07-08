import { Button } from "@mui/material";
import moment from "moment";
import ButtonItems from "../../../components/common/button-items";
import LinkTo from "../../../components/common/link-to";

const likedBlogsTableColumns = (unLikeBlog) => [
	{
		name: "blog.title",
		label: "Title",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "blog.tags",
		label: "Tags",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<ButtonItems items={value} />
			),
		},
	},
	{
		name: "blog.categories",
		label: "Categories",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<ButtonItems items={value} />
			),
		},
	},
	{
		name: "blog.likes",
		label: "Likes",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "blog.comments",
		label: "Comments",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "blog.bookmarks",
		label: "Bookmarks",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "blog.createdAt",
		label: "Blog CreatedAt",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				moment(value, "YYYYMMDD").fromNow(),
		},
	},
	{
		name: "blog.updatedAt",
		label: "Blog UpdatedAt",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				moment(value, "YYYYMMDD").fromNow(),
		},
	},
	{
		name: "createdAt",
		label: "Like CreatedAt",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				moment(value, "YYYYMMDD").fromNow(),
		},
	},
	{
		name: "blog.slug",
		label: "Visit",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<Button
					as={LinkTo}
					to={`/blog/${value}`}
					variant="contained"
					color="primary"
					size="small"
					sx={{ "&:hover": { color: "#fff" } }}
					disableElevation
				>
					visit this blog
				</Button>
			),
		},
	},
	{
		name: "Action",
		label: "Action",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<Button
					onClick={() => unLikeBlog(tableMeta.rowIndex)}
					variant="contained"
					color="success"
					size="small"
					sx={{ "&:hover": { color: "#fff" } }}
					disableElevation
				>
					unlike
				</Button>
			),
		},
	},
];

export default likedBlogsTableColumns;
