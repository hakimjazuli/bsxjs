// @ts-check

import { BSXSetter } from '../class/BSXSetter.mjs';
import { BSXParam } from '../class/BSXParam.mjs';
import { Console } from '../class/Console.mjs';
import { QChannel } from '../class/QChannel.mjs';
import { callForTruthyResponsesNames } from '../function/forResponses.mjs';
import { Timeout } from '../function/Timeout.mjs';
import { TrySync } from '../function/TrySync.mjs';

export const qChannelPing = new QChannel('BSX x-param directive');

/**
 * @description
 * - alpine directive `x-param`;
 * ```html
 *	<input type="text" x-data x-param:1000.user="onkeyup" name="user-page" />
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Param(Alpine) {
	Alpine.directive(
		'param',
		(
			inputElement,
			{ expression: onEventTrigger, modifiers, value: debounceMS = 0 },
			{ cleanup },
		) => {
			if (!(inputElement instanceof HTMLInputElement)) {
				Console.error('alpine x-param can only be put on HTMLInputElement');
				return;
			}
			const listener = () => {
				qChannelPing.callback(inputElement, async ({ isLastOnQ }) => {
					if (!isLastOnQ()) {
						return;
					}
					let awaitForDebouncer;
					if (debounceMS) {
						awaitForDebouncer = Timeout(Number(debounceMS).valueOf());
					}
					BSXParam.set({ [inputElement.name]: inputElement.value });
					BSXSetter.dispatch(...modifiers);
					callForTruthyResponsesNames(inputElement);
					if (!awaitForDebouncer) {
						return;
					}
					await awaitForDebouncer;
				});
			};
			TrySync(() => {
				inputElement.addEventListener(onEventTrigger, listener);
				cleanup(() => {
					inputElement.removeEventListener(onEventTrigger, listener);
				});
			});
		},
	);
}
