import React from "react";
import ListItems from '../../common/list-items';
import { Box } from '@mui/material';
import ShortTitle from "../../common/short-title";
import { useSelector } from "react-redux";
import { resetDataState as resetCategoryDataState } from "../../../features/category/category.slice";
import { resetDataState as resetTagDataState } from "../../../features/tag/tag.slice";

const categories = [
	{ text: "Inbox1" },
	{ text: "Inbox2" },
	{ text: "Inbox3" },
	{ text: "Inbox4" },
	{ text: "Inbox5" },
	{ text: "Inbox6" },
	{ text: "Inbox7" },
	{ text: "Inbox8" },
	{ text: "Inbox9" },
	{ text: "Inbox10" },
	{ text: "Inbox11" },
	{ text: "Inbox12" }
];

const tags = [
	{ text: "#tag1" },
	{ text: "#tag2" },
	{ text: "#tag3" },
	{ text: "#tag4" },
	{ text: "#tag5" },
	{ text: "#tag6" },
	{ text: "#tag7" },
	{ text: "#tag8" },
	{ text: "#tag9" },
	{ text: "#tag10" },
	{ text: "#tag11" },
	{ text: "#tag12" },
]

const LeftSidebar = () => {
	const { categories } = useSelector((state) => state.category);
	const { tags } = useSelector((state) => state.tag);

	return (
		<>
			<Box sx={{ mb: 3 }}>
				<Box sx={{ p: 2, background: "#EAEDED" }}>
					<ShortTitle title='Popular Categories' />
				</Box>

				<ListItems items={categories} height="50vh" url='/category' resetDataState={resetCategoryDataState} />
			</Box>

			<Box sx={{ mb: 3 }}>
				<Box sx={{ p: 2, background: "#EAEDED" }}>
					<ShortTitle title='Popular Tags' />
				</Box>

				<ListItems items={tags} height="50vh" symbolBeforeText="#" url='/tag' resetDataState={resetTagDataState} />
			</Box>
		</>
	);
};

export default LeftSidebar;
