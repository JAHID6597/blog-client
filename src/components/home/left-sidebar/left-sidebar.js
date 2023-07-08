import React from "react";
import ListItems from "../../common/list-items";
import { Box } from "@mui/material";
import ShortTitle from "../../common/short-title";
import { useSelector } from "react-redux";
import { resetDataState as resetCategoryDataState } from "../../../features/category/category.slice";
import { resetDataState as resetTagDataState } from "../../../features/tag/tag.slice";

const LeftSidebar = () => {
	const { categories } = useSelector((state) => state.category);
	const { tags } = useSelector((state) => state.tag);

	return (
		<>
			<Box sx={{ mb: 3 }}>
				<Box sx={{ p: 2, background: "#EAEDED" }}>
					<ShortTitle title="Popular Categories" />
				</Box>

				<ListItems
					items={categories}
					height="50vh"
					url="/category"
					resetDataState={resetCategoryDataState}
				/>
			</Box>

			<Box sx={{ mb: 3 }}>
				<Box sx={{ p: 2, background: "#EAEDED" }}>
					<ShortTitle title="Popular Tags" />
				</Box>

				<ListItems
					items={tags}
					height="50vh"
					symbolBeforeText="#"
					url="/tag"
					resetDataState={resetTagDataState}
				/>
			</Box>
		</>
	);
};

export default LeftSidebar;
