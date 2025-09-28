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
import { useNavigate } from "react-router-dom";
import { resetDataState } from "../../features/tag/tag.slice";

const TagCard = ({ tag, urlType = "" }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTagItemClick = () => {
		let url = "";
		if (urlType === "slug") url = "";
		else {
			dispatch(resetDataState(true));
			url = `/tag/${tag?.slug}`;
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
						borderTop: `10px solid ${tag?.color}`,
					}}
				>
					<CardContent sx={{ width: "100%" }}>
						<Box
							sx={{
								cursor: "pointer",
								color: "black",
								"&:hover": { color: "#551A8B" },
							}}
							onClick={handleTagItemClick}
						>
							{tag?.name ? (
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
									{tag?.name}
								</Typography>
							) : (
								<Skeleton
									variant="text"
									sx={{ mb: 2 }}
									height={55}
								/>
							)}
						</Box>

						{tag?.name ? (
							<Typography>
								{" "}
								{tag?.blogs?.length} posts published{" "}
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

export default TagCard;
