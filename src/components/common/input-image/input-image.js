import { Box } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DisplayInputImage from "./display-input-image";
import SelectInputImage from "./select-input-image";
import Error from "../error";

const InputImage = ({
	name = "file",
	title,
	type = "image",
	setFormData,
	formData,
	...others
}) => {
	const [image, setImage] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		setImage(formData[`${name}`]);
	}, [formData, name]);

	const onDrop = (accepted, rejected) => {
		if (Object.keys(rejected).length) {
			setError(`Please select a valid ${type}.`);
		} else {
			const blobPromise = new Promise((resolve, reject) => {
				const reader = new window.FileReader();
				reader.readAsDataURL(accepted[0]);
				reader.onloadend = () => {
					const base64data = reader.result;
					resolve(base64data);
				};
			});

			blobPromise.then((value) => {
				setImage(value);
				setFormData({ ...formData, [`${name}`]: value });

				setError("");
			});

			blobPromise.catch((err) => setError(err));
		}
	};

	const accept = {
		"image/png": [".png"],
		"image/jpg": [".jpg"],
		"image/jpeg": [".jpeg"],
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
	});

	return (
		<Box {...others}>
			{image && (
				<DisplayInputImage
					image={image}
					onDrop={onDrop}
					getRootProps={getRootProps}
					isDragActive={isDragActive}
				/>
			)}

			{!image && (
				<SelectInputImage
					onDrop={onDrop}
					getRootProps={getRootProps}
					getInputProps={getInputProps}
					isDragActive={isDragActive}
					name={name}
					title={title}
				/>
			)}

			{error && <Error message={String(error)} />}
		</Box>
	);
};

export default InputImage;
