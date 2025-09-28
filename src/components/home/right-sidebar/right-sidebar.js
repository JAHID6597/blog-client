import React from "react";
import { useSelector } from "react-redux";
import { resetDataState } from "../../../features/category/category.slice";
import ListItemDetails from "../../common/list-item-details";

const RightSidebar = () => {
	const { categories } = useSelector((state) => state.category);

	return categories?.length
		? categories
				.slice(0, 5)
				.map((category) => (
					<ListItemDetails
						key={category._id}
						url={`/category/${category.slug}`}
						title={category.name}
						items={category.blogs}
						resetDataState={resetDataState}
					/>
				))
		: [1, 2, 3, 4, 5].map((item) => <ListItemDetails key={item} />);
};

export default RightSidebar;
