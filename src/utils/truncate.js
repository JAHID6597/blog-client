import * as cheerio from "cheerio";

const truncate = (html) =>
	cheerio
		.load(html)
		.text()
		.replace(/(\r\n|\n|\r)/gm, "");

export default truncate;
