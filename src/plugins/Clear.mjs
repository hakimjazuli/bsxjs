// @ts-check

import { Console } from '../class/Console.mjs';
import { queueChannelForm } from './Dispatch.mjs';

/**
 * @description
 * - alpine directive `x-clear`;
 * - clearing form input elements from it's value;
 * - then with will `focus` selection to `input[focus]`;
 * ```html
 * <form x-data x-dispatch:100.user="/user" method="post" x-clear.name.email>
 *	<input type="text" name="name" focus />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Clear(Alpine) {
	Alpine.directive('clear', (formElement, { modifiers: namesToClear }, { cleanup }) => {
		if (!(formElement instanceof HTMLFormElement)) {
			Console.error('alpine x-clear, can only be put on HTMLFormElement');
			return;
		}
		const namesToClear_ = new Set(namesToClear);
		const inputElements = formElement.querySelectorAll('input');
		/**
		 * @param {SubmitEvent} ev
		 */
		const listener = (ev) => {
			ev.preventDefault();
			queueChannelForm.callback(formElement, async () => {
				for (let i = 0; i < inputElements.length; i++) {
					const inputElement_ = inputElements[i];
					if (
						//
						!inputElement_
					) {
						continue;
					}
					if (namesToClear_.has(inputElement_.getAttribute('name') ?? '')) {
						inputElement_.value = '';
					}
					inputElement_.removeAttribute('disabled');
					if (!inputElement_.hasAttribute('focus')) {
						continue;
					}
					inputElement_.focus();
				}
			});
		};
		formElement.addEventListener('submit', listener);
		cleanup(() => {
			formElement.removeEventListener('submit', listener);
		});
	});
}
