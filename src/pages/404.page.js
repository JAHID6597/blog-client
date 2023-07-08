import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import lottie from "lottie-web";
import lottie404 from "../assets/lottie/404.json";

const Page404 = () => {
	const navigate = useNavigate();

	useEffect(() => {
		lottie.loadAnimation({
			container: document.querySelector("#lottie404"),
			animationData: lottie404,
		});
	}, []);

	return (
		<>
			<Box id="lottie404" sx={{ height: "80vh", width: "100%" }} />
			<Box sx={{ my: 5, textAlign: "center" }}>
				<Button
					variant="contained"
					sx={{
						background: "#6600ff",
						fontSize: { sm: 20, xs: 15 },
						fontWeight: "bold",
						"&:hover": { background: "#6600ff" },
					}}
					onClick={() => navigate("/")}
				>
					Go To Main Page
				</Button>
			</Box>
			l
		</>
	);
};

export default Page404;
