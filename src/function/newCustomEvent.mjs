// @ts-check

/**
 * @param {HTMLElement|Document} el
 * @param {string} name
 * @param {any} [detail]
 */
export const newCustomEvent = (el, name, detail = {}) => {
	el.dispatchEvent(
		new CustomEvent(name, {
			detail,
			bubbles: true,
			// Allows events to pass the shadow DOM barrier.
			composed: true,
			cancelable: true,
		}),
	);
};
