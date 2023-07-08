import React, { useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Category, Edit, Save } from "@mui/icons-material";
import validation from "./validation";
import Error from "../common/error";
import InputImage from "../common/input-image/input-image";

const CategoryForm = ({
	type,
	touched,
	setTouched,
	formData,
	setFormData,
	errorMessage,
	setErrorMessage,
	setSubmit,
	handleSubmit,
}) => {
	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit));
	}, [formData, setErrorMessage, setSubmit, touched]);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Box
			component="form"
			autoComplete="off"
			onSubmit={handleSubmit}
			sx={{ width: "100%" }}
		>
			<Box sx={{ mt: 2 }}>
				<Grid
					container
					spacing={0}
					sx={{
						boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
						background: "#fff",
					}}
				>
					<Grid
						item
						md={4}
						sx={{
							display: { md: "block", xs: "none" },
							background: "#f9f9f9",
							p: 3,
						}}
					>
						<Category sx={{ color: "#E7E7E7", fontSize: "6rem" }} />

						<Typography
							variant="h5"
							sx={{ mt: 1, fontWeight: "bold" }}
						>
							{" "}
							Category Information{" "}
						</Typography>

						<Typography
							variant="body2"
							sx={{ mt: 1, color: "#777777" }}
						>
							{" "}
							Details information about the category.{" "}
						</Typography>
					</Grid>

					<Grid item xs={12} md={8} sx={{ p: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name="name"
									fullWidth
									label="Category Name"
									value={formData.name}
									onBlur={(e) => handleBlur(e)}
									onChange={(e) => handleChange(e)}
									required
								/>

								{errorMessage.name && (
									<Error message={errorMessage.name} />
								)}
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="description"
									fullWidth
									label="Description"
									value={formData.description}
									onBlur={(e) => handleBlur(e)}
									onChange={(e) => handleChange(e)}
									multiline
									rows={3}
								/>

								{errorMessage.description && (
									<Error message={errorMessage.description} />
								)}
							</Grid>

							<Grid item xs={12}>
								<InputImage
									name="image"
									title="Choose a category image or Drag it here."
									type="image"
									onBlur={() =>
										setTouched({ ...touched, image: true })
									}
									setFormData={setFormData}
									formData={formData}
								/>
								{errorMessage.image && (
									<Error message={errorMessage.image} />
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Button
					size="large"
					type="submit"
					variant="contained"
					sx={{ mt: 5 }}
				>
					{type.toLowerCase() === "create" ? (
						<Save sx={{ mr: 1 }} />
					) : (
						<Edit sx={{ mr: 1 }} />
					)}{" "}
					{type} Category
				</Button>
			</Box>
		</Box>
	);
};

export default CategoryForm;
