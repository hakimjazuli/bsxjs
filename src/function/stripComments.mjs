// @ts-check

/**
 * Remove JS-style comments from a string
 * @param {string} text
 * @returns {string}
 */
export const stripComments = (text) => {
	// remove /* block comments */
	let cleaned = text.replace(/\/\*[\s\S]*?\*\//g, '');
	// remove // line comments
	cleaned = cleaned.replace(/\/\/.*$/gm, '');
	return cleaned.trim();
};
