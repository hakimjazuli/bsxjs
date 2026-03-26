// @ts-check

import { BSXAnchor } from '../class/BSXAnchor.mjs';
import { Console } from '../class/Console.mjs';
import { ParseBSXExpression } from '../function/ParseBSXExpression.mjs';

/**
 * @description
 * - alpine directive `x-a`;
 * - client side routing;
 * ```html
 * <a x-data x-a href="/">
 *	<button>home</button>
 * </a>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function A(Alpine) {
	Alpine.directive('a', (xAnchorElement) => {
		if (!(xAnchorElement instanceof HTMLAnchorElement)) {
			Console.error('alpine x-a can only be put on HTMLAnchorElement');
			return;
		}
		xAnchorElement.onclick = (ev) => {
			ev.preventDefault();
			BSXAnchor.navigate(ParseBSXExpression(xAnchorElement.href), true);
		};
	});
}
