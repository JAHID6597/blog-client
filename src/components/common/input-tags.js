import React from "react";
import { TextField, Autocomplete, Chip } from "@mui/material";

const InputTags = ({
	suggestions,
	handleBlur,
	setFormData,
	formData,
	setTagSearch,
}) => {
	return (
		<Autocomplete
			multiple
			onChange={(e, value) =>
				setFormData({ ...formData, tags: value.slice(0, 10) })
			}
			id="tags-filled"
			options={suggestions.map((option) => option)}
			freeSolo
			value={formData.tags}
			renderTags={(value, getTagProps) =>
				value
					.slice(0, 10)
					.map((option, index) => (
						<Chip
							variant="filled"
							key={option}
							label={option}
							{...getTagProps({ index })}
						/>
					))
			}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Tags"
					name="tags"
					placeholder={
						formData?.tags?.length < 10
							? "Enter related tags and press enter..."
							: "Maximum 10 tags allowed..."
					}
					onBlur={(e) => handleBlur(e)}
					onChange={(e) => setTagSearch(e.target.value)}
				/>
			)}
		/>
	);
};

export default InputTags;
