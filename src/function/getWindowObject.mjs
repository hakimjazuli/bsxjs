// @ts-check

/**
 * @param {string} expression
 * @returns {any}
 */
export const getWindowObject = (expression) => {
	if (/^\d+$/.test(expression)) {
		return Number(expression);
	}
	return expression.split('.').reduce(
		(acc, key) =>
			// @ts-expect-error
			acc?.[key],
		window,
	);
};
