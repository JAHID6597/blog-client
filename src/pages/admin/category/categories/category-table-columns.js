import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

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
			customBodyRenderLite: (idx) => (
				<img
					src={categories[idx].image}
					alt="category-img"
					height="50"
					width="50"
				/>
			),
		},
	},
	{
		name: "color.background",
		label: "Background Color",
		options: {
			filter: true,
			sort: true,
			customBodyRenderLite: (idx) => (
				<Box
					sx={{
						backgroundColor: categories[idx].color.background,
						height: 25,
						width: 25,
						border:
							categories[idx].color.background &&
							"1px solid black",
					}}
				/>
			),
		},
	},
	{
		name: "color.text",
		label: "Text Color",
		options: {
			filter: true,
			sort: true,
			customBodyRenderLite: (idx) => (
				<Box
					sx={{
						backgroundColor: categories[idx].color.text,
						height: 25,
						width: 25,
						border: categories[idx].color.text && "1px solid black",
					}}
				/>
			),
		},
	},
	{
		name: "blogIds",
		label: "Total Blogs",
		options: {
			filter: true,
			sort: true,
			customBodyRenderLite: (idx) => categories[idx].blogIds.length,
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
								`/admin/category/${categories[idx].slug}/update`
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
];

export default categoryTableColumns;
