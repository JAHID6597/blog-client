import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Autocomplete,
	Avatar,
	Box,
	Button,
	Chip,
	Grid,
	IconButton,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import {
	DirectionsRun,
	Edit,
	Inventory,
	Link,
	Psychology,
	Work,
} from "@mui/icons-material";

import FullBackdrop from "../../../../components/common/full-backdrop";
import Error from "../../../../components/common/error";
import {
	resetUserCommonState,
	updateProfile,
} from "../../../../features/user/user.slice";
import validation from "./validation";
import { toast } from "react-toastify";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const BIO_CHARACTER_LIMIT = 200;

	const { privateProfile, isError, isUpdateSuccess, isLoading, message } =
		useSelector((state) => state.user);

	const [touched, setTouched] = useState({
		firstName: false,
		lastName: false,
		userName: true,
		email: true,
	});
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		profilePicture: "",
		bio: "",
		address: "",
		dob: "",
		favouriteColor: "",
		work: { organization: "", position: "" },
		education: { institution: "", degree: "" },
		socialUrl: { website: "", github: "", facebook: "", twitter: "" },
		skills: [],
		languages: [],
		learning: [],
		hacking: [],
		availability: "",
	});

	const [errorMessage, setErrorMessage] = useState({});
	const [isSubmit, setSubmit] = useState(false);

	useEffect(() => {
		setFormData({ ...privateProfile });
	}, [privateProfile]);

	useEffect(() => {
		if (isError) toast.error(message);

		return () => dispatch(resetUserCommonState());
	}, [dispatch, isError, message]);

	useEffect(() => {
		if (isUpdateSuccess) navigate(`/user/${privateProfile.userName}`);

		return () => dispatch(resetUserCommonState());
	}, [dispatch, isUpdateSuccess, navigate, privateProfile.userName]);

	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit));
	}, [formData, setErrorMessage, setSubmit, touched]);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setFormData({ ...formData, profilePicture: reader.result });
		};
	};

	const handleUpdateProfile = (e) => {
		e.preventDefault();

		console.log(formData);

		if (isSubmit) dispatch(updateProfile(formData));
	};

	return (
		<>
			{isLoading && <FullBackdrop isOpenBackDrop={isLoading} />}
			<Box
				component="form"
				autoComplete="off"
				onSubmit={handleUpdateProfile}
			>
				<Box sx={{ mt: 3 }}>
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
							<Inventory
								sx={{ color: "#E7E7E7", fontSize: "6rem" }}
							/>

							<Typography
								variant="h5"
								sx={{ mt: 1, fontWeight: "bold" }}
							>
								General Information
							</Typography>

							<Typography
								variant="body2"
								sx={{ mt: 1, color: "#777777" }}
							>
								Add here the general information with all
								details and necessary information.
							</Typography>
						</Grid>

						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Box
										sx={{
											alignSelf: "center",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										<TextField
											accept="image/*"
											style={{ display: "none" }}
											id="icon-button-file"
											type="file"
											name="profilePicture"
											onChange={handleImageChange}
										/>
										<InputLabel htmlFor="icon-button-file">
											<IconButton
												color="primary"
												aria-label="upload picture"
												component="span"
											>
												<Avatar
													sx={{
														width: 130,
														height: 130,
													}}
													src={
														formData.profilePicture
													}
												/>
											</IconButton>
										</InputLabel>
									</Box>
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										name="firstName"
										fullWidth
										label="First Name"
										value={formData.firstName || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>

									{errorMessage.firstName && (
										<Error
											message={errorMessage.firstName}
										/>
									)}
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										name="lastName"
										fullWidth
										label="Last Name"
										value={formData.lastName || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>

									{errorMessage.lastName && (
										<Error
											message={errorMessage.lastName}
										/>
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="userName"
										fullWidth
										label="User Name"
										value={formData.userName}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
										required
									/>

									{errorMessage.userName && (
										<Error
											message={errorMessage.userName}
										/>
									)}
								</Grid>

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
										<Error message={errorMessage.email} />
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="bio"
										fullWidth
										label="About Me"
										value={formData.bio || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
										multiline
										rows={3}
										inputProps={{
											maxlength: BIO_CHARACTER_LIMIT,
										}}
										helperText={`${
											formData?.bio?.length || 0
										}/${BIO_CHARACTER_LIMIT}`}
									/>

									{errorMessage.bio && (
										<Error message={errorMessage.bio} />
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="address"
										fullWidth
										label="Address"
										value={formData.address || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>

									{errorMessage.address && (
										<Error message={errorMessage.address} />
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="dob"
										fullWidth
										type="date"
										label="Date Of Birth"
										value={formData.dob || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>

									{errorMessage.dob && (
										<Error message={errorMessage.dob} />
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="favouriteColor"
										fullWidth
										type="color"
										label="Favourite Color"
										value={formData.favouriteColor || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>

									{errorMessage.favouriteColor && (
										<Error
											message={
												errorMessage.favouriteColor
											}
										/>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						container
						spacing={0}
						sx={{
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							background: "#fff",
							mt: 5,
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
							<Work sx={{ color: "#E7E7E7", fontSize: "6rem" }} />

							<Typography
								variant="h5"
								sx={{ mt: 1, fontWeight: "bold" }}
							>
								Experience & Qualifications
							</Typography>

							<Typography
								variant="body2"
								sx={{ mt: 1, color: "#777777" }}
							>
								Add here your working experience & educational
								qualifications.
							</Typography>
						</Grid>

						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Typography
								variant="h6"
								sx={{ mb: 2, fontWeight: "bold" }}
							>
								Working Experience
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										name="organization"
										fullWidth
										label="Organization"
										value={
											formData.work?.organization || ""
										}
										onChange={(e) =>
											setFormData({
												...formData,
												work: {
													...formData.work,
													organization:
														e.target.value,
												},
											})
										}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="position"
										fullWidth
										label="Position"
										value={formData.work?.position || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												work: {
													...formData.work,
													position: e.target.value,
												},
											})
										}
									/>
								</Grid>
							</Grid>

							<Typography
								variant="h6"
								sx={{ mt: 5, mb: 2, fontWeight: "bold" }}
							>
								Educational Qualifications
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										name="institution"
										fullWidth
										label="Institution"
										value={
											formData.education?.institution ||
											""
										}
										onChange={(e) =>
											setFormData({
												...formData,
												education: {
													...formData.education,
													institution: e.target.value,
												},
											})
										}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="degree"
										fullWidth
										label="Degree"
										value={formData.education?.degree || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												education: {
													...formData.education,
													degree: e.target.value,
												},
											})
										}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						container
						spacing={0}
						sx={{
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							background: "#fff",
							mt: 5,
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
							<Link sx={{ color: "#E7E7E7", fontSize: "6rem" }} />

							<Typography
								variant="h5"
								sx={{ mt: 1, fontWeight: "bold" }}
							>
								Social Links
							</Typography>

							<Typography
								variant="body2"
								sx={{ mt: 1, color: "#777777" }}
							>
								Add here your social links.
							</Typography>
						</Grid>

						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name="website"
										fullWidth
										label="Website Link"
										value={
											formData.socialUrl?.website || ""
										}
										onChange={(e) =>
											setFormData({
												...formData,
												socialUrl: {
													...formData.socialUrl,
													website: e.target.value,
												},
											})
										}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="github"
										fullWidth
										label="Github Link"
										value={formData.socialUrl?.github || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												socialUrl: {
													...formData.socialUrl,
													github: e.target.value,
												},
											})
										}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="facebook"
										fullWidth
										label="Facebook Link"
										value={
											formData.socialUrl?.facebook || ""
										}
										onChange={(e) =>
											setFormData({
												...formData,
												socialUrl: {
													...formData.socialUrl,
													facebook: e.target.value,
												},
											})
										}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										name="twitter"
										fullWidth
										label="Twitter Link"
										value={
											formData.socialUrl?.twitter || ""
										}
										onChange={(e) =>
											setFormData({
												...formData,
												socialUrl: {
													...formData.socialUrl,
													twitter: e.target.value,
												},
											})
										}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						container
						spacing={0}
						sx={{
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							background: "#fff",
							mt: 5,
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
							<Psychology
								sx={{ color: "#E7E7E7", fontSize: "6rem" }}
							/>

							<Typography
								variant="h5"
								sx={{ mt: 1, fontWeight: "bold" }}
							>
								Skills and Languages
							</Typography>

							<Typography
								variant="body2"
								sx={{ mt: 1, color: "#777777" }}
							>
								Add here your skills and languages that you
								know.
							</Typography>
						</Grid>

						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										sx={{ mb: 2, fontWeight: "bold" }}
									>
										Skills
									</Typography>
									<Autocomplete
										multiple
										onChange={(e, value) =>
											setFormData({
												...formData,
												skills: value.slice(0, 10),
											})
										}
										options={[]}
										freeSolo
										renderTags={(value, getTagProps) =>
											value
												.slice(0, 10)
												.map((option, index) => (
													<Chip
														variant="filled"
														key={option}
														label={option}
														{...getTagProps({
															index,
														})}
													/>
												))
										}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Skills"
												name="skills"
												placeholder={
													formData?.skills?.length <
													10
														? "Enter skill and press enter..."
														: "Maximum 10 allowed..."
												}
												onBlur={(e) => handleBlur(e)}
											/>
										)}
									/>

									{errorMessage.skills && (
										<Error message={errorMessage.skills} />
									)}
								</Grid>

								<Grid item xs={12}>
									<Typography
										variant="h6"
										sx={{
											mt: 1,
											mb: 2,
											fontWeight: "bold",
										}}
									>
										Languages
									</Typography>
									<Autocomplete
										multiple
										onChange={(e, value) =>
											setFormData({
												...formData,
												languages: value.slice(0, 10),
											})
										}
										options={[]}
										freeSolo
										renderTags={(value, getTagProps) =>
											value
												.slice(0, 10)
												.map((option, index) => (
													<Chip
														variant="filled"
														key={option}
														label={option}
														{...getTagProps({
															index,
														})}
													/>
												))
										}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Languages"
												name="languages"
												placeholder={
													formData?.languages
														?.length < 10
														? "Enter language and press enter..."
														: "Maximum 10 allowed..."
												}
												onBlur={(e) => handleBlur(e)}
											/>
										)}
									/>

									{errorMessage.languages && (
										<Error
											message={errorMessage.languages}
										/>
									)}
								</Grid>

								<Grid item xs={12}>
									<Typography
										variant="h6"
										sx={{
											mt: 1,
											mb: 2,
											fontWeight: "bold",
										}}
									>
										Currently Learning
									</Typography>
									<Autocomplete
										multiple
										onChange={(e, value) =>
											setFormData({
												...formData,
												learning: value.slice(0, 10),
											})
										}
										options={[]}
										freeSolo
										renderTags={(value, getTagProps) =>
											value
												.slice(0, 10)
												.map((option, index) => (
													<Chip
														variant="filled"
														key={option}
														label={option}
														{...getTagProps({
															index,
														})}
													/>
												))
										}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Currently Learning"
												name="learning"
												placeholder={
													formData?.learning?.length <
													10
														? "Enter learning items and press enter..."
														: "Maximum 10 allowed..."
												}
												onBlur={(e) => handleBlur(e)}
											/>
										)}
									/>

									{errorMessage.languages && (
										<Error
											message={errorMessage.languages}
										/>
									)}
								</Grid>

								<Grid item xs={12}>
									<Typography
										variant="h6"
										sx={{
											mt: 1,
											mb: 2,
											fontWeight: "bold",
										}}
									>
										Currently Hacking On
									</Typography>

									<Autocomplete
										multiple
										onChange={(e, value) =>
											setFormData({
												...formData,
												hacking: value.slice(0, 10),
											})
										}
										options={[]}
										freeSolo
										renderTags={(value, getTagProps) =>
											value
												.slice(0, 10)
												.map((option, index) => (
													<Chip
														variant="filled"
														key={option}
														label={option}
														{...getTagProps({
															index,
														})}
													/>
												))
										}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Currently Hacking On"
												name="hacking"
												placeholder={
													formData?.hacking?.length <
													10
														? "Enter hacking items and press enter..."
														: "Maximum 10 allowed..."
												}
												onBlur={(e) => handleBlur(e)}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						container
						spacing={0}
						sx={{
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							background: "#fff",
							mt: 5,
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
							<DirectionsRun
								sx={{ color: "#E7E7E7", fontSize: "6rem" }}
							/>

							<Typography
								variant="h5"
								sx={{ mt: 1, fontWeight: "bold" }}
							>
								Availability
							</Typography>

							<Typography
								variant="body2"
								sx={{ mt: 1, color: "#777777" }}
							>
								Add here your available information.
							</Typography>
						</Grid>

						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										sx={{ mb: 2, fontWeight: "bold" }}
									>
										Why your are available on this site?
									</Typography>
									<TextField
										name="availability"
										fullWidth
										label="Available for"
										value={formData.availability || ""}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
										multiline
										rows={5}
									/>
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
						<Edit sx={{ mr: 1 }} /> Update Profile
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default UpdateProfile;
