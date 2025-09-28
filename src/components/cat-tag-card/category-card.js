import React from "react";
import {
	Box,
	Card,
	CardContent,
	Grid,
	Skeleton,
	Typography,
} from "@mui/material";
import { Fade } from "react-reveal";
import { useDispatch } from "react-redux";
import { resetDataState } from "../../features/category/category.slice";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, urlType = "" }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCategoryItemClick = () => {
		let url = "";
		if (urlType === "slug") url = "";
		else {
			dispatch(resetDataState(true));
			url = `/category/${category?.slug}`;
		}

		navigate(url, { replace: true });
	};

	return (
		<Grid item lg={4} md={6} sm={12}>
			<Fade>
				<Card
					sx={{
						display: "flex",
						mb: 2,
						height: "100%",
						borderTop: `10px solid ${category?.color}`,
					}}
				>
					<CardContent sx={{ width: "100%" }}>
						<Box
							sx={{
								cursor: "pointer",
								color: "black",
								"&:hover": { color: "#551A8B" },
							}}
							onClick={handleCategoryItemClick}
						>
							{category?.name ? (
								<Typography
									variant="h1"
									sx={{
										fontSize: 25,
										fontWeight: "bold",
										mb: 2,
										overflow: "hidden",
										whiteSpace: "pre-line",
										textOverflow: "ellipsis",
										height: 30,
										wordBreak: "break-all",
									}}
								>
									{category?.name}
								</Typography>
							) : (
								<Skeleton
									variant="text"
									sx={{ mb: 2 }}
									height={55}
								/>
							)}

							{category?.description ? (
								<Typography
									variant="h5"
									sx={{
										fontSize: 17,
										mb: 1,
										overflow: "hidden",
										whiteSpace: "pre-line",
										textOverflow: "ellipsis",
										height: 45,
									}}
								>
									{category?.description}
								</Typography>
							) : (
								<Skeleton
									variant="text"
									sx={{ mb: 1 }}
									height={45}
								/>
							)}
						</Box>

						{category?.name ? (
							<Typography>
								{" "}
								{category?.blogs?.length} posts published{" "}
							</Typography>
						) : (
							<Skeleton variant="text" sx={{ mb: 1 }} />
						)}
					</CardContent>
				</Card>
			</Fade>
		</Grid>
	);
};

export default CategoryCard;
