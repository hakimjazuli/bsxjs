// @ts-check

import { BSXToast } from '../class/BSXToast.mjs';
import { Console } from '../class/Console.mjs';
import { setBsxResponsesVariantCallback } from '../function/setBsxResponsesVariantCallback.mjs';

/**
 * @description
 * - alpine directive `x-toast`;
 * ```html
 * <form x-data x-dispatch:100.user="/user" x-toast:3000.true.info="okok" x-toast:3000.false.warning="not okei">
 *	<input type="text" name="name" />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Toast(Alpine) {
	Alpine.directive(
		'toast',
		(
			toastDescriptionElement,
			{ value: toastLifeTimeMS = 2500, modifiers: premodifiers, original: originalAttribute },
		) => {
			if (premodifiers.length < 0 || premodifiers.length >= 3) {
				Console.error({
					toastDescriptionElement,
					originalAttribute,
					message: 'modifiers.length must be between 0 to 3',
				});
				return;
			}
			const modifiers = new Set(premodifiers);
			/**
			 * @type {'true'|'false'}
			 */
			let truthyHandler;
			if (modifiers.has('false')) {
				modifiers.delete('false');
				truthyHandler = 'false';
			} else {
				if (modifiers.has('true')) {
					modifiers.delete('true');
				}
				truthyHandler = 'true'; // default truthyValue
			}
			const modifiers_ = [...modifiers];
			if (modifiers_.length > 1) {
				Console.error({
					toastDescriptionElement,
					originalAttribute,
					modifiers_,
					message: 'invalid modifiers values',
					'allowed modifiers': ['true', 'false', 'any kind of bootstrap style variant'],
				});
				return;
			}
			let bootstrapVariant = [...modifiers_][0];
			if (!bootstrapVariant) {
				switch (truthyHandler) {
					case 'true':
						bootstrapVariant = 'info';
						break;
					case 'false':
						bootstrapVariant = 'warning';
						break;
				}
			}
			setBsxResponsesVariantCallback(toastDescriptionElement, truthyHandler, () => {
				const infoTextOrAlpineExpression =
					toastDescriptionElement.getAttribute(originalAttribute) ?? '';
				if (!infoTextOrAlpineExpression) {
					return;
				}
				BSXToast.new(
					new Number(toastLifeTimeMS).valueOf(),
					infoTextOrAlpineExpression,
					bootstrapVariant,
				);
			});
		},
	);
}
