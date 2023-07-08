import React from "react";
import { Box, Typography } from "@mui/material";

const DisplayInputImage = ({ getRootProps, onDrop, isDragActive, image }) => {
	return (
		<Box
			sx={{ height: "285px", width: "100%", position: "relative" }}
			onDrop={(accepted, rejected) => onDrop(accepted, rejected)}
			{...getRootProps()}
		>
			<Box
				sx={{
					height: "100%",
					width: "100%",
					position: "absolute",
					color: "transparent",
					"&:hover": {
						color: "white",
						display: "block",
						background: "rgba(0, 0, 0, 0.5)",
					},
				}}
			>
				<Box
					sx={{
						height: "100%",
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						variant="h2"
						sx={{
							fontSize: { md: "25px", sm: "20px", xs: "25px" },
							p: 1,
						}}
					>
						{isDragActive
							? "Release to upload image."
							: "Choose a image or Drag it here."}
					</Typography>
				</Box>
			</Box>

			<img
				src={image}
				alt="Img"
				style={{ height: "100%", width: "100%" }}
			/>
		</Box>
	);
};

export default DisplayInputImage;
