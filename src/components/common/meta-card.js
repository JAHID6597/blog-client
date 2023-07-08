import React from "react";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import ShortTitle from "./short-title";
import { useNavigate } from "react-router-dom";

const MetaCard = ({ title, items }) => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				background: "#fafafa",
				mb: 2,
				borderRadius: "10px",
				boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
			}}
		>
			{items && title && (
				<Box sx={{ p: 2 }}>
					<ShortTitle title={title} />
				</Box>
			)}

			{items && (
				<>
					<Divider />

					<List sx={{ p: 2 }}>
						{items.map((item) => (
							<ListItem
								key={item.text}
								disablePadding
								sx={{
									py: item.icon && 1,
									cursor: item?.url ? "pointer" : "",
									"&:hover": {
										color: item?.url ? "#000aaa" : "",
									},
								}}
								onClick={() =>
									navigate(item?.url ? item?.url : "", {
										replace: true,
									})
								}
							>
								{item.icon && (
									<ListItemIcon>
										<item.icon />
									</ListItemIcon>
								)}
								<ListItemText>{item.text}</ListItemText>
							</ListItem>
						))}
					</List>
				</>
			)}
		</Box>
	);
};

export default MetaCard;
