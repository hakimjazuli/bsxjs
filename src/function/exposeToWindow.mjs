/**
 * @param {string} name
 * @param {any} object
 * @returns
 */
export function exposeToWindow(name, object) {
	// @ts-expect-error
	if (window[name]) {
		return;
	}
	// @ts-expect-error
	window[name] = object;
}
