import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import CounterStatusCard from "../../components/dashboard/counter-status-card";
import { generateUserCounterStatusCardData } from "./utils/generate-user-counter-status-card-data";

const UserDashboard = () => {
	const { privateProfile } = useSelector((state) => state.user);
	const counterStatusCardItems =
		generateUserCounterStatusCardData(privateProfile);

	return (
		<Grid container spacing={2}>
			{counterStatusCardItems.map((counterStatusCardItem) => (
				<Grid item md={4} sm={6} xs={12} key={counterStatusCardItem.id}>
					<CounterStatusCard
						counterStatusCardItem={counterStatusCardItem}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default UserDashboard;
