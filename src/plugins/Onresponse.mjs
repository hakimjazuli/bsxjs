// @ts-check

import { Console } from '../class/Console.mjs';
import { setBsxResponsesVariantCallback } from '../function/setBsxResponsesVariantCallback.mjs';
import { TryAsync } from '../function/TryAsync.mjs';

/**
 * @description
 * - alpine directive `x-onresponse`;
 * ```html
 * <form x-data x-dispatch:100.user="/user" x-onresponse.true="console.log('okok')">
 *	<input type="text" name="name" />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Onresponse(Alpine) {
	Alpine.directive(
		'onresponse',
		(responseDetectionElement, { modifiers, original: originalAttribute }, { evaluate }) => {
			let expectedResponse = modifiers[0];
			if (!expectedResponse) {
				expectedResponse = 'true';
			}
			switch (expectedResponse) {
				case 'true':
				case 'false':
					setBsxResponsesVariantCallback(responseDetectionElement, `x-${expectedResponse}`, () => {
						TryAsync(async () => {
							const alpineExpression =
								responseDetectionElement.getAttribute(originalAttribute) ?? '';
							if (!alpineExpression) {
								throw {
									originalAttribute,
									alpineExpression,
									message: 'x-onresponse expression must be truthy',
								};
							}
							await evaluate(alpineExpression);
						}).then(([, errorEvaluatingXToast]) => {
							if (!errorEvaluatingXToast) {
								return;
							}
							Console.error({ errorEvaluatingXToast });
						});
					});
					return;
			}
			Console.error({
				originalAttribute,
				'modifiers[0]': modifiers[0],
				message: "x-onresponse modifiers[0], only allowed to be string 'true' or 'false'",
			});
		},
	);
}
