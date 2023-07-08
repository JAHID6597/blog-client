import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	getPublicProfile,
	resetState,
} from "../../../features/user/user.slice";
import FullBackdrop from "../../common/FullBackdrop";

const UserProfileForm = () => {
	const { userName } = useParams();
	const { user, privateProfile, isLoading } = useSelector(
		(state) => state.user,
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (userName) dispatch(getPublicProfile());

		return () => dispatch(resetState());
	}, [dispatch, userName]);

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
						{name} Blog
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
										name="title"
										fullWidth
										id="title"
										label="Title"
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>
									{errorMessage.title && (
										<Error message={errorMessage.title} />
									)}
								</Grid>

								<Grid item xs={12}>
									<InputTags
										suggestions={allTags}
										handleBlur={handleBlur}
										setFormData={setFormData}
										formData={formData}
									/>

									{errorMessage.tags && (
										<Error message={errorMessage.tags} />
									)}
								</Grid>

								<Grid item xs={12}>
									<FormControl sx={{ width: "100%" }}>
										<InputLabel>Categories</InputLabel>
										<Select
											multiple
											value={formData.categories}
											name="categories"
											onBlur={(e) => handleBlur(e)}
											onChange={(e) =>
												setFormData({
													...formData,
													categories:
														typeof e.target
															.value === "string"
															? e.target.value.split(
																	",",
															  )
															: e.target.value,
												})
											}
											input={
												<OutlinedInput label="Categories" />
											}
											renderValue={(selected) => (
												<Box
													sx={{
														display: "flex",
														flexWrap: "wrap",
														gap: 0.5,
													}}
												>
													{selected.map((value) => (
														<Chip
															key={value}
															label={value}
														/>
													))}
												</Box>
											)}
											MenuProps={MenuProps}
										>
											{allCategories.map((category) => (
												<MenuItem
													key={category}
													value={category}
												>
													<Checkbox
														checked={
															formData.categories.indexOf(
																category,
															) > -1
														}
													/>
													<ListItemText
														primary={category}
													/>
												</MenuItem>
											))}
										</Select>

										{errorMessage.categories && (
											<Error
												message={
													errorMessage.categories
												}
											/>
										)}
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<Editor
										editorClassName="form-control"
										editorState={content}
										onEditorStateChange={
											handleContentEditorChange
										}
										editorStyle={{
											minHeight: "300px",
											maxHeight: "300px",
											background: "#fafafa",
											boxShadow:
												"rgba(0, 0, 0, 0.16) 0px 1px 4px",
										}}
										toolbar={{
											options: [
												"inline",
												"blockType",
												"fontSize",
												"list",
												"textAlign",
												"history",
											],
											link: { inDropdown: true },
											history: { inDropdown: true },
										}}
									/>

									{errorMessage.content && (
										<Error message={errorMessage.content} />
									)}
								</Grid>

								<>
									<Grid item xs={12} sm={4}>
										<InputImage
											name="cardImage"
											title="Choose a card image or Drag it here."
											type="image"
											onBlur={() =>
												setTouched({
													...touched,
													cardImage: true,
												})
											}
											setFormData={setFormData}
											formData={formData}
										/>
										{errorMessage.cardImage && (
											<Error
												message={errorMessage.cardImage}
											/>
										)}
									</Grid>

									<Grid item xs={12} sm={8}>
										<InputImage
											name="bannerImage"
											title="Choose a banner image or Drag it here."
											type="image"
											onBlur={() =>
												setTouched({
													...touched,
													bannerImage: true,
												})
											}
											setFormData={setFormData}
											formData={formData}
										/>
										{errorMessage.bannerImage && (
											<Error
												message={
													errorMessage.bannerImage
												}
											/>
										)}
									</Grid>
								</>
							</Grid>

							<Button
								size="large"
								type="submit"
								variant="contained"
								fullWidth
								sx={{ mt: 5 }}
							>
								{name}
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default UserProfileForm;
