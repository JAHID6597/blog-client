import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FullBackdrop from "../../../../components/common/full-backdrop";
import Error from "../../../../components/common/error";
import validation from "./validation";
import CenterScreenLayout from "../../../../layout/center-screen-layout";
import { toast } from "react-toastify";
import {
	changePassword,
	resetUserCommonState,
} from "../../../../features/user/user.slice";

const ChangePassword = () => {
	const dispatch = useDispatch();

	const [touched, setTouched] = useState({
		currentPassword: false,
		newPassword: false,
		confirmPassword: false,
	});
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit));
	}, [formData, setErrorMessage, setSubmit, touched]);

	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { isError, isUpdateSuccess, isLoading, message } = useSelector(
		(state) => state.user,
	);

	useEffect(() => {
		if (isUpdateSuccess) {
			toast.success("Successfully changed password.");
			setFormData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
			setTouched({
				currentPassword: false,
				newPassword: false,
				confirmPassword: false,
			});
		}
		if (isError) toast.error(message);

		return () => dispatch(resetUserCommonState());
	}, [dispatch, isError, isUpdateSuccess, message]);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleChangePassword = (e) => {
		e.preventDefault();

		console.log(formData);

		if (isSubmit) dispatch(changePassword(formData));
	};

	return (
		<CenterScreenLayout>
			<Box
				sx={{
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
					background: "#fff",
				}}
			>
				{isLoading && <FullBackdrop isOpenBackDrop={isLoading} />}

				<Container component="main" maxWidth="xs">
					<Box
						sx={{
							py: { md: 5, xs: 3 },
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlined />
						</Avatar>

						<Typography
							component="h1"
							variant="h4"
							sx={{ textTransform: "uppercase" }}
						>
							Change Password
						</Typography>
						<Box
							component="form"
							autoComplete="off"
							onSubmit={handleChangePassword}
						>
							<Box sx={{ mt: { md: 5, xs: 3 } }}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="currentPassword"
											label="Current Password"
											type={
												showCurrentPassword
													? "text"
													: "password"
											}
											id="password"
											value={formData.currentPassword}
											onBlur={(e) => handleBlur(e)}
											onChange={(e) => handleChange(e)}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() =>
																setShowCurrentPassword(
																	(
																		showCurrentPassword,
																	) =>
																		!showCurrentPassword,
																)
															}
															edge="end"
														>
															{showCurrentPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										{errorMessage.currentPassword && (
											<Error
												message={
													errorMessage.currentPassword
												}
											/>
										)}
									</Grid>

									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="newPassword"
											label="New Password"
											type={
												showNewPassword
													? "text"
													: "password"
											}
											id="password"
											value={formData.newPassword}
											onBlur={(e) => handleBlur(e)}
											onChange={(e) => handleChange(e)}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() =>
																setShowNewPassword(
																	(
																		showNewPassword,
																	) =>
																		!showNewPassword,
																)
															}
															edge="end"
														>
															{showNewPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										{errorMessage.newPassword && (
											<Error
												message={
													errorMessage.newPassword
												}
											/>
										)}
									</Grid>

									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="confirmPassword"
											label="Confirm Password"
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											id="password"
											value={formData.confirmPassword}
											onBlur={(e) => handleBlur(e)}
											onChange={(e) => handleChange(e)}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() =>
																setShowConfirmPassword(
																	(
																		showConfirmPassword,
																	) =>
																		!showConfirmPassword,
																)
															}
															edge="end"
														>
															{showConfirmPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										{errorMessage.confirmPassword && (
											<Error
												message={
													errorMessage.confirmPassword
												}
											/>
										)}
									</Grid>
								</Grid>

								<Button
									size="large"
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3 }}
								>
									Change Password
								</Button>
							</Box>
						</Box>
					</Box>
				</Container>
			</Box>
		</CenterScreenLayout>
	);
};

export default ChangePassword;
