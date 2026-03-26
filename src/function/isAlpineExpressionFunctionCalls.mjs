// @ts-check

/**
 * @param {string} alpineExpression
 * @returns {boolean}
 */
export const isAlpineExpressionFunctionCalls = (alpineExpression) => {
	return /(\([\s\S]*\))/g.test(alpineExpression);
};
