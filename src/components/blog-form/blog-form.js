import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";

import FullBackdrop from "../common/full-backdrop";
import InputTags from "../common/input-tags";
import validation from "./validation";
import Error from "../common/error";
import InputImage from "../common/input-image/input-image";
import { useDispatch, useSelector } from "react-redux";
import {
	getCategories,
	resetState as resetCategoryState,
} from "../../features/category/category.slice";
import {
	getTags,
	resetState as resetTagState,
} from "../../features/tag/tag.slice";
import InputCategories from "../common/input-categories";

const BlogForm = ({
	name,
	touched,
	setTouched,
	errorMessage,
	setErrorMessage,
	formData,
	setFormData,
	content,
	setContent,
	setSubmit,
	handleSubmit,
	isLoading,
}) => {
	const [tagSearch, setTagSearch] = useState("");
	const [categorySearch, setCategorySearch] = useState("");

	const dispatch = useDispatch();

	const { categories } = useSelector((state) => state.category);
	const { tags } = useSelector((state) => state.tag);

	const [allCategories, setAllCategories] = useState([]);
	const [allTags, setAllTags] = useState([]);

	useEffect(() => {
		dispatch(getCategories({ search: categorySearch }));
		dispatch(getTags({ search: tagSearch }));

		return () => {
			dispatch(resetCategoryState());
			dispatch(resetTagState());
		};
	}, [categorySearch, dispatch, tagSearch]);

	useEffect(() => {
		setAllCategories(categories);
		setAllTags(tags);
	}, [categories, tags]);

	useEffect(() => {
		setErrorMessage(validation(touched, formData, setSubmit));
	}, [formData, setErrorMessage, setSubmit, touched]);

	const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleContentEditorChange = (state) => {
		setContent(state);
		let currentContentAsHTML = convertToHTML(content.getCurrentContent());
		setFormData({ ...formData, content: currentContentAsHTML });
	};

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
										value={formData.title}
										onBlur={(e) => handleBlur(e)}
										onChange={(e) => handleChange(e)}
									/>
									{errorMessage.title && (
										<Error message={errorMessage.title} />
									)}
								</Grid>

								<Grid item xs={12}>
									<InputTags
										suggestions={allTags.map(
											(item) => item.name,
										)}
										handleBlur={handleBlur}
										setFormData={setFormData}
										formData={formData}
										setTagSearch={setTagSearch}
									/>

									{errorMessage.tags && (
										<Error message={errorMessage.tags} />
									)}
								</Grid>

								<Grid item xs={12}>
									<InputCategories
										suggestions={allCategories.map(
											(item) => item.name,
										)}
										handleBlur={handleBlur}
										setFormData={setFormData}
										formData={formData}
										setCategorySearch={setCategorySearch}
									/>

									{errorMessage.categories && (
										<Error
											message={errorMessage.categories}
										/>
									)}
								</Grid>

								<Grid item xs={12}>
									<Editor
										editorClassName="form-control"
										editorState={content}
										onBlur={() =>
											setTouched({
												...touched,
												content: true,
											})
										}
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

export default BlogForm;
