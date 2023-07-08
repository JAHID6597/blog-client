import React from "react";
import { Box } from "@mui/material";
import sanitizeHtml from "sanitize-html";

const Sanitized = ({ content = "" }) => {
	const sanitized = sanitizeHtml(content, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
	});

	return (
		<Box
			sx={{ wordWrap: "break-word", pb: 2 }}
			dangerouslySetInnerHTML={{ __html: sanitized }}
		/>
	);
};

export default Sanitized;
