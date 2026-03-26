/**
 * @description
 * - Replace all `?${paramName}='${defaultValue}'` occurrences in an expression string;
 * >- no need to quote the `?${paramName}='${defaultValue}'` with single or double quote;
 * >- default value should be quoted by single quote;
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
export function ParseQueryParamFromExpression(expression: string): string;
export function isStringContainsQueryParams(string: string): boolean;
