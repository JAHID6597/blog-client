import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import LinkTo from "../../../../components/common/link-to";

const categoryTableColumns = (categories, navigate, handleDeleteCategory) => [
	{
		name: "name",
		label: "Name",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "slug",
		label: "Slug",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "description",
		label: "Description",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "image",
		label: "Image",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<img src={value} alt="category-img" height="50" width="100%" />
			),
		},
	},
	{
		name: "color",
		label: "Color",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => (
				<Box
					sx={{
						backgroundColor: value,
						height: 25,
						width: "100%",
					}}
				/>
			),
		},
	},
	{
		name: "blogs",
		label: "Total Blogs",
		options: {
			filter: true,
			sort: true,
			customBodyRender: (value, tableMeta, updateValue) => value?.length,
		},
	},
	{
		name: "",
		label: "Actions",
		options: {
			filter: true,
			sort: true,
			customBodyRenderLite: (idx) => (
				<>
					<IconButton
						onClick={() =>
							navigate(
								`/admin/category/${categories[idx].slug}/update`,
							)
						}
					>
						<Edit />
					</IconButton>
					<IconButton
						onClick={() =>
							handleDeleteCategory(categories[idx].slug)
						}
					>
						<Delete />
					</IconButton>
				</>
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
					to={`/category/${value}`}
					variant="contained"
					color="primary"
					size="small"
					sx={{ "&:hover": { color: "#fff" } }}
					disableElevation
				>
					visit category
				</Button>
			),
		},
	},
];

export default categoryTableColumns;
