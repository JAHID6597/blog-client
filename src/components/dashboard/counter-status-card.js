import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { Zoom } from "react-reveal";

const CounterStatusCard = ({ counterStatusCardItem }) => {
	return (
		<Zoom>
			<Card>
				<Box sx={{ p: 2 }}>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-between",
						}}
					>
						<counterStatusCardItem.icon
							sx={{ height: 50, width: 50, opacity: 0.5 }}
						/>

						<Typography
							sx={{
								textAlign: "center",
								fontSize: 35,
								fontWeight: "bold",
							}}
						>
							{counterStatusCardItem.count}
						</Typography>
					</Box>
					<Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
						{counterStatusCardItem.title}
					</Typography>
				</Box>
			</Card>
		</Zoom>
	);
};

export default CounterStatusCard;
