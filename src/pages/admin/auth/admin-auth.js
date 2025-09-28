import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Error from "../../../components/common/error";
import { signIn } from "../../../features/admin/admin.slice";
import CenterScreenLayout from "../../../layout/center-screen-layout";
import validation from "./validation";

const AdminAuth = () => {
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isError, isSuccess, message } = useSelector((state) => state.admin);

	const [touched, setTouched] = useState({
		email: false,
		password: false,
	});

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit));
	}, [formData, touched]);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess) {
			setTimeout(() => {
				navigate("/admin/dashboard", { replace: true });
			}, 0);
		}
	}, [isError, isSuccess, message, navigate]);

	const handleShowPassword = () =>
		setShowPassword((showPassword) => !showPassword);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSubmit) {
			dispatch(signIn(formData));
		}
	};

	return (
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
							Sign in
						</Typography>

						<Box
							component="form"
							autoComplete="off"
							onSubmit={handleSubmit}
						>
							<Box sx={{ mt: { md: 5, xs: 3 } }}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											name="email"
											type="email"
											fullWidth
											label="Email"
											value={formData.email}
											onBlur={(e) => handleBlur(e)}
											onChange={(e) => handleChange(e)}
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
											onChange={(e) => handleChange(e)}
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
												message={errorMessage.password}
											/>
										)}
									</Grid>
								</Grid>

								<Button
									size="large"
									type="submit"
									fullWidth
									variant="contained"
									sx={{ my: 2 }}
								>
									Sign In
								</Button>
							</Box>
						</Box>
					</Box>
				</Container>
			</Box>
		</CenterScreenLayout>
	);
};

export default AdminAuth;
