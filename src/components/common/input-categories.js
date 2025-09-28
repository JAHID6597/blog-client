import React from "react";
import { Checkbox, TextField, Autocomplete } from "@mui/material";

import {
	CheckBoxOutlineBlank,
	CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const InputCategories = ({
	suggestions,
	formData,
	setFormData,
	handleBlur,
	setCategorySearch,
}) => {
	return (
		<Autocomplete
			multiple
			onChange={(e, value) =>
				setFormData({ ...formData, categories: value.slice(0, 10) })
			}
			id="checkboxes-tags-demo"
			options={suggestions}
			value={formData.categories}
			disableCloseOnSelect
			getOptionLabel={(option) => option}
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option}
				</li>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Categories"
					name="categories"
					placeholder={
						formData?.categories?.length < 10
							? "Select related categories..."
							: "Maximum 10 categories allowed..."
					}
					onBlur={(e) => handleBlur(e)}
					onChange={(e) => setCategorySearch(e.target.value)}
				/>
			)}
		/>
	);
};

export default InputCategories;
