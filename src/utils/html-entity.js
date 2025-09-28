export const decodeHtmlEntity = (textString) =>
	textString?.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

export const encodeHtmlEntity = (textString) => {
	const buf = [];

	for (let i = textString.length - 1; i >= 0; i--)
		buf.unshift(["&#", textString[i].charCodeAt(), ";"].join(""));

	return buf.join("");
};
