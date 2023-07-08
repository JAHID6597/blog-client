import React from "react";
import { Box, Divider, Skeleton } from "@mui/material";
import ListCard from "./list-card";
import ShortTitle from "./short-title";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListItemDetails = ({
	url,
	title,
	items = [1, 2, 3, 4, 5],
	resetDataState,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleItemClick = () => {
		if (resetDataState) dispatch(resetDataState(true));

		navigate(url, { replace: true });
	};

	return items?.length ? (
		<Box
			sx={{
				background: "white",
				mb: 2,
				borderRadius: "10px",
				boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
			}}
		>
			<Box sx={{ p: 2 }}>
				{title ? (
					url ? (
						<Box
							sx={{
								cursor: "pointer",
								color: "black",
								"&:hover": { color: "#551A8B" },
							}}
							onClick={handleItemClick}
						>
							<ShortTitle title={title} />
						</Box>
					) : (
						<ShortTitle title={title} />
					)
				) : (
					<Skeleton variant="text" />
				)}
			</Box>

			{items.map((item) => (
				<React.Fragment key={item._id || item}>
					<Divider />

					<ListCard item={item} fontWeight="bold" />
				</React.Fragment>
			))}
		</Box>
	) : (
		""
	);
};

export default ListItemDetails;
