import { Delete, Edit } from "@mui/icons-material";
import {
	Button,
	FormControlLabel,
	IconButton,
	Stack,
	Switch,
} from "@mui/material";
import moment from "moment";
import LinkTo from "../../../components/common/link-to";

const commentsTableColumns = (
	navigateToBlogUpdatePage,
	handleActiveComment,
	handleDeleteComment,
) => [
	{
		name: "comment",
		label: "Comment",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "user",
		label: "Author",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value.userName,
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
								handleActiveComment(tableMeta.rowIndex)
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
		name: "blog",
		label: "Visit",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<Button
					as={LinkTo}
					to={`/blog/${value.slug}`}
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
						onClick={() => handleDeleteComment(tableMeta.rowIndex)}
					>
						<Delete />
					</IconButton>
				</Stack>
			),
		},
	},
];

export default commentsTableColumns;
