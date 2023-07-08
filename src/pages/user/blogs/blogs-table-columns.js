import { Delete, Edit } from "@mui/icons-material";
import {
	Button,
	FormControlLabel,
	IconButton,
	Stack,
	Switch,
} from "@mui/material";
import moment from "moment";
import ButtonItems from "../../../components/common/button-items";
import LinkTo from "../../../components/common/link-to";

const blogsTableColumns = (
	navigateToBlogUpdatePage,
	handleActiveBlog,
	handleDeleteBlog,
) => [
	{
		name: "title",
		label: "Title",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "tags",
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
		name: "categories",
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
		name: "likes",
		label: "Likes",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "comments",
		label: "Comments",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "bookmarks",
		label: "Bookmarks",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "createdAt",
		label: "CreatedAt",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				moment(value, "YYYYMMDD").fromNow(),
		},
	},
	{
		name: "updatedAt",
		label: "UpdatedAt",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				moment(value, "YYYYMMDD").fromNow(),
		},
	},
	{
		name: "isActive",
		label: "Active",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<FormControlLabel
					sx={{ display: "block" }}
					control={
						<Switch
							checked={value}
							onChange={() =>
								handleActiveBlog(tableMeta.rowIndex)
							}
							name="isActive"
							color="success"
						/>
					}
				/>
			),
		},
	},
	{
		name: "slug",
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
		name: "Actions",
		label: "Actions",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<Stack
					direction="row"
					spacing={1}
					sx={{ justifyContent: "center" }}
				>
					<IconButton
						onClick={() =>
							navigateToBlogUpdatePage(tableMeta.rowIndex)
						}
					>
						<Edit />
					</IconButton>
					<IconButton
						onClick={() => handleDeleteBlog(tableMeta.rowIndex)}
					>
						<Delete />
					</IconButton>
				</Stack>
			),
		},
	},
];

export default blogsTableColumns;
