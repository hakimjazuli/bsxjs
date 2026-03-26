// @ts-check

import { BSXSetter } from '../class/BSXSetter.mjs';
import { Console } from '../class/Console.mjs';
import { QChannel } from '../class/QChannel.mjs';
import { callForFalsyResponsesNames } from '../function/callForFalsyResponsesNames.mjs';
import { callForTruthyResponsesNames } from '../function/forResponses.mjs';
import { GetGlobalFnCaller } from '../function/GetGlobalFnCaller.mjs';
import { isAlpineExpressionFunctionCalls } from '../function/isAlpineExpressionFunctionCalls.mjs';
import {
	isStringContainsQueryParams,
	ParseQueryParamFromExpression,
} from '../function/ParseQueryParamFromExpression.mjs';
import { Timeout } from '../function/Timeout.mjs';
import { TryAsync } from '../function/TryAsync.mjs';

export const queueChannelForm = new QChannel('BSX x-dispatch submition Q');

/**
 * @description
 * - alpine directive `x-dispatch`;
 * ```html
 * <form x-data x-dispatch:100.user="/user">
 *	<input type="text" name="name" />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Dispatch(Alpine) {
	Alpine.directive(
		'dispatch',
		(xDispatchElement, { modifiers, original: originalAttribute, value: debounceMS = 0 }) => {
			if (!(xDispatchElement instanceof HTMLFormElement)) {
				Console.error('alpine x-dispatch can only be put on HTMLFormElement');
				return;
			}
			const inputElements = xDispatchElement.querySelectorAll('input');
			xDispatchElement.onsubmit = (ev) => {
				ev.preventDefault();
				queueChannelForm.callback(xDispatchElement, async ({ isLastOnQ }) => {
					if (!isLastOnQ()) {
						return;
					}
					const formData = new FormData(xDispatchElement);
					for (let i = 0; i < inputElements.length; i++) {
						const inputElement_ = inputElements[i];
						if (!inputElement_) {
							continue;
						}
						inputElement_.setAttribute('disabled', '');
					}
					let expression = xDispatchElement.getAttribute(originalAttribute) ?? '';
					if (!expression) {
						return;
					}
					if (isStringContainsQueryParams(expression)) {
						expression = ParseQueryParamFromExpression(expression);
					}
					let awaitForDebouncer;
					if (debounceMS) {
						awaitForDebouncer = Timeout(Number(debounceMS).valueOf());
					}
					/**
					 * @type {RequestInit}
					 */
					const requestInit = {
						credentials: 'include',
						method: 'POST',
						headers: {
							'BSX-REQUEST': 'true',
							'BSX-LISTENER': 'false',
							'BSX-DISPATCHER': modifiers.join(';'),
						},
						body: formData,
					};
					const usesFunctionHandler = isAlpineExpressionFunctionCalls(expression);
					const [res, errorDispatcherResponses] = await TryAsync(async () => {
						if (!usesFunctionHandler) {
							const res = await fetch(expression, requestInit);
							return res.ok;
						}
						const [handlerRef, errorGettingHandlerReference] = GetGlobalFnCaller(
							// @ts-expect-error
							requestInit,
							expression,
							xDispatchElement,
							formData,
						);
						if (errorGettingHandlerReference) {
							throw errorGettingHandlerReference;
						}
						if (typeof handlerRef !== 'function') {
							throw {
								handlerRef,
								message: '`handlerRef` should be valid global function/function call',
							};
						}
						const [res, errorRunningHandler] = await TryAsync(async () => {
							return await handlerRef();
						});
						if (errorRunningHandler) {
							throw errorRunningHandler;
						}
						if (res !== true) {
							throw {
								message: 'dispatcher expects handler to return `true`',
							};
						}
						return res;
					});
					if (errorDispatcherResponses) {
						Console.error({ errorDispatcherResponses });
						callForFalsyResponsesNames(xDispatchElement);
						return;
					}
					if (res !== true) {
						Console.error({
							message: 'dispatcher expects handler to return `true`',
						});
						callForFalsyResponsesNames(xDispatchElement);
						return;
					}
					BSXSetter.dispatch(...modifiers);
					callForTruthyResponsesNames(xDispatchElement);
					if (!awaitForDebouncer) {
						return;
					}
					await awaitForDebouncer;
				});
			};
		},
	);
}
