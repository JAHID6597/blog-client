import React from "react";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ListItems = ({
	items,
	height,
	symbolBeforeText = "",
	url = "",
	isResetDataState,
	resetDataState,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleItemClicked = (item) => {
		navigate(`${url}/${item.slug}`);

		dispatch(resetDataState(true));
	};

	return (
		<List
			disablePadding
			sx={{
				background: "#fafafa",
				maxHeight: height || "100%",
				overflowY: height && "scroll",
			}}
		>
			{items.length
				? items.map((item) => (
						<ListItem
							key={item.name}
							sx={{
								"&:hover": { background: "#E2E3F3" },
								cursor: "pointer",
							}}
							onClick={() => (url ? handleItemClicked(item) : "")}
						>
							{item.icon && (
								<ListItemIcon sx={{ minWidth: "40px" }}>
									{<item.icon />}
								</ListItemIcon>
							)}

							<ListItemText
								primary={symbolBeforeText + item.name}
							/>
						</ListItem>
				  ))
				: [1, 2, 3, 4, 5].map((i) => (
						<Skeleton
							sx={{ mx: 1, py: 2 }}
							key={i}
							variant="text"
						/>
				  ))}
		</List>
	);
};

export default ListItems;
