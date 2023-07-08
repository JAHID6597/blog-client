import React, { useEffect } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Error from "../common/error";
import FullBackdrop from "../common/full-backdrop";
import validation from "./validation";

const CommentForm = ({
	name,
	touched,
	setTouched,
	errorMessage,
	setErrorMessage,
	formData,
	setFormData,
	setSubmit,
	handleSubmit,
	isLoading,
}) => {
	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit));
	}, [formData, setErrorMessage, setSubmit, touched]);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Box
			sx={{
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				background: "#fff",
			}}
		>
			{isLoading && <FullBackdrop isOpenBackDrop={isLoading} />}

			<Container>
				<Box
					sx={{
						py: { md: 5, xs: 3 },
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						component="h1"
						variant="h4"
						sx={{ textTransform: "uppercase" }}
					>
						{name} Comment
					</Typography>

					<Box
						component="form"
						autoComplete="off"
						onSubmit={handleSubmit}
						sx={{ mx: 0 }}
					>
						<Box sx={{ mt: { md: 5, xs: 3 } }}>
							<TextField
								variant="outlined"
								name="comment"
								label="Comment"
								placeholder="Enter your comment..."
								value={formData.comment}
								onBlur={(e) => handleBlur(e)}
								onChange={(e) => handleChange(e)}
								multiline
								rows={5}
								fullWidth
								required
							/>
							{errorMessage.comment && (
								<Error message={errorMessage.comment} />
							)}

							<Button
								size="large"
								type="submit"
								variant="contained"
								fullWidth
								sx={{ mt: 5 }}
							>
								{" "}
								{name}{" "}
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default CommentForm;
