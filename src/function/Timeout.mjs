// @ts-check

/**
 * @description
 * - function helper to temporarily block the code in async context;
 * - passed `BSX.timeout`;
 * @param {number} timeMS
 * - in miliseconds;
 * @returns {Promise<void>}
 * @example
 * await BSX.timeout(1000);
 */
export function Timeout(timeMS) {
	const { promise, resolve } = Promise.withResolvers();
	setTimeout(resolve, timeMS);
	return promise;
}
