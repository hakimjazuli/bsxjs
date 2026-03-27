// @ts-check

import { BSXAnchor } from '../class/BSXAnchor.mjs';
import { Console } from '../class/Console.mjs';
import { ParseQueryParamFromExpression } from '../function/ParseQueryParamFromExpression.mjs';

/**
 * @description
 * - alpine directive `x-a`;
 * - client side routing;
 * ```html
 * <a x-data x-a href="/">
 *	<button>home</button>
 * </a>
 * ```
 * - expression can be used to scroll to target upn
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function A(Alpine) {
	Alpine.directive(
		'a',
		(xAnchorElement, { expression: scrollTarget, original: originalAttribute }) => {
			if (!(xAnchorElement instanceof HTMLAnchorElement)) {
				Console.error({
					xAnchorElement,
					originalAttribute,
					message: 'alpine x-a can only be put on HTMLAnchorElement',
				});
				return;
			}
			xAnchorElement.onclick = (ev) => {
				ev.preventDefault();
				BSXAnchor.navigate(ParseQueryParamFromExpression(xAnchorElement.href), {
					push: true,
					scrollTarget,
				});
			};
		},
	);
}
