import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

import { signIn, signUp } from "../../../features/user/user.slice";
import { resetUserCommentState } from "../../../features/blog/blog.slice";
import Error from "../../../components/common/error";
import validation from "./validation";
import LinkTo from "../../../components/common/link-to";
import CenterScreenLayout from "../../../layout/center-screen-layout";
import FullBackdrop from "../../../components/common/full-backdrop";

const UserAuth = ({ isSignup }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isError, isUpdateSuccess, message, isLoading } = useSelector(
		(state) => state.user,
	);

	const [touched, setTouched] = useState({
		firstName: false,
		lastName: false,
		userName: false,
		email: false,
		password: false,
		confirmPassword: false,
	});
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit, isSignup));
	}, [formData, isSignup, touched]);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isUpdateSuccess) {
			setTimeout(() => {
				if (!isSignup) navigate("/user/dashboard", { replace: true });
				else navigate("/user/signin", { replace: true });
			}, 0);
		}

		return () => dispatch(resetUserCommentState());
	}, [dispatch, isError, isSignup, isUpdateSuccess, message, navigate]);

	const switchMode = () => {
		setTouched({
			firstName: false,
			lastName: false,
			userName: false,
			email: false,
			password: false,
			confirmPassword: false,
		});
		setFormData({
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setSubmit(false);
		setShowPassword(false);
		setShowConfirmPassword(false);
	};

	const handleShowPassword = () =>
		setShowPassword((showPassword) => !showPassword);

	const handleShowConfirmPassword = () =>
		setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSubmit) {
			if (isSignup) dispatch(signUp(formData));
			else dispatch(signIn(formData));
		}
	};

	return (
		<>
			{isLoading && <FullBackdrop isOpenBackDrop={isLoading} />}

			<CenterScreenLayout>
				<Box
					sx={{
						boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
						background: "#fff",
					}}
				>
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
								{" "}
								<Person />{" "}
							</Avatar>
							<Typography
								component="h1"
								variant="h4"
								sx={{ textTransform: "uppercase" }}
							>
								{isSignup ? "Sign up" : "Sign in"}
							</Typography>
							<Box
								component="form"
								autoComplete="off"
								onSubmit={handleSubmit}
							>
								<Box sx={{ mt: { md: 5, xs: 3 } }}>
									<Grid container spacing={2}>
										{isSignup && (
											<Grid item xs={12}>
												<TextField
													name="userName"
													fullWidth
													label="User Name"
													value={formData.userName}
													onBlur={(e) =>
														handleBlur(e)
													}
													onChange={(e) =>
														handleChange(e)
													}
													required
												/>

												{errorMessage.userName && (
													<Error
														message={
															errorMessage.userName
														}
													/>
												)}
											</Grid>
										)}

										<Grid item xs={12}>
											<TextField
												name="email"
												type="email"
												fullWidth
												label="Email"
												value={formData.email}
												onBlur={(e) => handleBlur(e)}
												onChange={(e) =>
													handleChange(e)
												}
												required
											/>

											{errorMessage.email && (
												<Error
													message={errorMessage.email}
												/>
											)}
										</Grid>

										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												name="password"
												label="Password"
												type={
													showPassword
														? "text"
														: "password"
												}
												id="password"
												value={formData.password}
												onBlur={(e) => handleBlur(e)}
												onChange={(e) =>
													handleChange(e)
												}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={
																	handleShowPassword
																}
																edge="end"
															>
																{showPassword ? (
																	<Visibility />
																) : (
																	<VisibilityOff />
																)}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											{errorMessage.password && (
												<Error
													message={
														errorMessage.password
													}
												/>
											)}
										</Grid>

										{isSignup && (
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
													id="confirmPassword"
													value={
														formData.confirmPassword
													}
													onBlur={(e) =>
														handleBlur(e)
													}
													onChange={(e) =>
														handleChange(e)
													}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={
																		handleShowConfirmPassword
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
										)}
									</Grid>
									<Button
										size="large"
										type="submit"
										fullWidth
										variant="contained"
										sx={{ my: 2 }}
									>
										{isSignup ? "Sign Up" : "Sign In"}
									</Button>
									<Box
										sx={{
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<LinkTo
											url={`/user/${
												isSignup ? "signin" : "signup"
											}`}
											onClick={switchMode}
										>
											{isSignup
												? "Already have an account? Sign in"
												: "Don't have an account? Sign Up"}
										</LinkTo>
									</Box>
								</Box>
							</Box>
						</Box>
					</Container>
				</Box>
			</CenterScreenLayout>
		</>
	);
};

export default UserAuth;
