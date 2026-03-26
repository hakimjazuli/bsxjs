// @ts-check

/**
 * @param {string} string
 * @returns {boolean}
 */
export const isStringContainsQueryParams = (string) => {
	return /\?[\w\d]*/g.test(string);
};

/**
 * @description
 * - Replace all `?${paramName}='${defaultValue}'` occurrences in an expression string;
 * - with the current value from the URL (or keep the default if no value).
 *
 * - Handles:
 * >- multiple parameters
 * >- optional parentheses
 * >- optional default values
 *
 * - passed as `BSX.parseExpression`
 * @param {string} expression
 * @returns {string}
 * @example
 * BSX.parseExpression("some.global.function.to.load.user.page(?user-page='0')");
 */
export function ParseBSXExpression(expression) {
	const url = new URL(window.location.href);

	return expression.replace(/\?([a-zA-Z0-9_-]+)(='[^']*')?/g, (_match, paramName, defaultPart) => {
		const currentValue = url.searchParams.get(paramName);
		const defaultValue = defaultPart ? defaultPart.slice(2, -1) : ''; // strip =" and trailing '

		// If URL has a value, use it; otherwise fall back to default
		const finalValue = currentValue ?? defaultValue;

		return `'${!!finalValue ? finalValue : defaultValue}'`;
	});
}
