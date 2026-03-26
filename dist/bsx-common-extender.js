// @ts-check

document.addEventListener(
	'bsx:init',
	({
		// @ts-expect-error
		detail: BSX,
	}) => {
		/**
		 * @template T
		 * @callback ReactiveEffect
		 * @returns {T}
		 * @property {number} id
		 * @property {boolean} active
		 * @property {() => T} raw
		 */
		/**
		 * @param {{[key:string]: (
		 *  element: HTMLElement,
		 *  directiveData:{
		 *    type: string,
		 *    value: string,
		 *    modifiers: string[],
		 *    expression: string,
		 *    original: string,
		 *  },
		 *  directiveUtilities: {
		 *    effect: <T>(callback: () => T) => ReactiveEffect<T>;
		 *    cleanup: (callback: () => void) => void;
		 *    evaluateLater: <T>(expression: string) => (callback?: (value: T) => void, extras?: {}) => void;
		 *    evaluate: <T>(expression: string | (() => T), extras?: Record<string, unknown>, _?: boolean) => T;
		 *  },
		 * )=>void}} directives
		 */
		const alpineDirectives = (directives) => {
			for (const name in directives) {
				if (!Object.hasOwn(directives, name)) {
					continue;
				}
				const toBeBinded = directives[name];
				BSX.alpine.directive(name, toBeBinded);
			}
		};
		/**
		 * @param {{
		 * [alpineBindName: string]: () => {[key:string]: any}}
		 * } xBindObject
		 */
		const alpineBinds = (xBindObject) => {
			for (const name in xBindObject) {
				if (!Object.hasOwn(xBindObject, name)) {
					continue;
				}
				const toBeBinded = xBindObject[name];
				BSX.alpine.bind(name, toBeBinded);
			}
		};
		/** EDITABLES START */
		/** EDITABLES END */
	},
);
