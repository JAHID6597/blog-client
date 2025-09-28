import React from "react";
import {
	Box,
	Button,
	Stack,
	Typography,
	ScopedCssBaseline,
	Skeleton,
} from "@mui/material";
import { useSelector } from "react-redux";
import CardHeaderItem from "../../../common/card-header-item";
import Sanitized from "../../../common/sanitized";
import { decodeHtmlEntity } from "../../../../utils/html-entity";

const Blog = () => {
	const { blog } = useSelector((state) => state.blog);

	return (
		<Box>
			<Box
				sx={{
					width: "100%",
					height: { md: "400px", sm: "350px", xs: "300px" },
				}}
			>
				{blog.bannerImage ? (
					<img
						src={blog.bannerImage}
						alt="Banner"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "fill",
							borderRadius: "10px 10px 0 0",
						}}
					/>
				) : (
					<Skeleton
						variant="rectangular"
						width="100%"
						height="100%"
					/>
				)}
			</Box>

			<Box sx={{ px: { md: 5, xs: 0 }, pt: { md: 2, xs: 0 } }}>
				<Box sx={{ py: 2 }}>
					{" "}
					<CardHeaderItem blog={blog} />{" "}
				</Box>

				<Box sx={{ px: 2 }}>
					{blog.title ? (
						<Typography
							variant="h1"
							sx={{
								fontSize: { md: 30, xs: 25 },
								fontWeight: "bold",
								mb: 1.5,
							}}
						>
							{" "}
							{blog.title}{" "}
						</Typography>
					) : (
						<Skeleton variant="text" height={40} />
					)}

					{blog?.tags?.length ? (
						<Stack
							direction="row"
							spacing={1.5}
							sx={{ mb: 5, flexWrap: "wrap" }}
						>
							{blog.tags.map((tag) => (
								<Button
									key={tag}
									size="medium"
									color="inherit"
									variant="contained"
									sx={{
										minHeight: 0,
										minWidth: 0,
										p: 1,
										py: 0,
										wordBreak: "break-all",
									}}
									disableElevation
								>
									{tag}
								</Button>
							))}
						</Stack>
					) : (
						<Stack
							direction="row"
							spacing={1.5}
							sx={{ mb: 5, flexWrap: "wrap" }}
						>
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton key={i} variant="text" width={100} />
							))}
						</Stack>
					)}

					<ScopedCssBaseline>
						<Box sx={{ pb: 5 }}>
							{blog.content ? (
								<Sanitized
									content={decodeHtmlEntity(blog.content)}
								/>
							) : (
								[1, 2, 3, 4, 5].map((i) => (
									<Skeleton key={i} variant="text" />
								))
							)}
						</Box>
					</ScopedCssBaseline>
				</Box>
			</Box>
		</Box>
	);
};

export default Blog;
