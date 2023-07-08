import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

const SelectInputImage = ({
	getRootProps,
	getInputProps,
	onDrop,
	isDragActive,
	name,
	title,
}) => {
	return (
		<Box
			sx={{
				border: `${
					isDragActive ? "3px solid #1cdf07" : "3px dotted #d1d6d6"
				}`,
				width: "100%",
				height: "285px",
				background: "#fff",
				boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
				borderRadius: "5px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				"&:hover": {
					background: "rgba(0, 0, 0, 0.1)",
				},
			}}
			onDrop={(accepted, rejected) => onDrop(accepted, rejected)}
			{...getRootProps()}
		>
			<Box sx={{ color: "#1cdf07" }}>
				<AddPhotoAlternate sx={{ width: "100px", height: "100px" }} />
			</Box>

			<Typography variant="h2" sx={{ fontSize: "20px", p: 1 }}>
				{isDragActive ? "Release to upload." : title}
			</Typography>

			<TextField
				type="file"
				hidden
				name={name || "file"}
				{...getInputProps()}
			/>
		</Box>
	);
};

export default SelectInputImage;
