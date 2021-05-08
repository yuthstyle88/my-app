const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");
const postcssNested = require("postcss-nested");
const postcssCustomProperties = require("postcss-custom-properties");
const autoprefixer = require("autoprefixer");

const cssnano = require("cssnano");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: [
		postcssImport(),
		tailwindcss(),
		postcssNested(),
		postcssCustomProperties(),
		autoprefixer(),
		!dev && cssnano({
			preset: "default",
		}),
	],
};
