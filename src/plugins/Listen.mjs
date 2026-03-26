// @ts-check

import { addElementToMappedGetter, removeElementFromMappedGetter } from '../class/BSXSetter.mjs';
import { Console } from '../class/Console.mjs';
import { QChannel } from '../class/QChannel.mjs';
import { callForFalsyResponsesNames } from '../function/callForFalsyResponsesNames.mjs';
import { callForTruthyResponsesNames } from '../function/forResponses.mjs';
import { getGlobalFnCaller } from '../function/getGlobalFnCaller.mjs';
import { isAlpineExpressionFunctionCalls } from '../function/isAlpineExpressionFunctionCalls.mjs';
import {
	isStringContainsQueryParams,
	ParseBSXExpression,
} from '../function/ParseBSXExpression.mjs';
import { stripComments } from '../function/stripComments.mjs';
import { Timeout } from '../function/Timeout.mjs';
import { TryAsync } from '../function/TryAsync.mjs';

export const bsxRefresh = 'bsxRefresh';
const bsxLoading = 'bsx-loading';
const qChannelListen = new QChannel('BSX x-listen directive');

/**
 * @description
 * - alpine directive `x-dispatch`;
 * ```html
 * <ul x-data="{users:[]}" x-listen.users="/users">
 * 	<template x-for="user in users" :key="users.id">
 * 		<li x-text="user.name"></li>
 * 		<li x-text="user.email"></li>
 * 	</template>
 * </ul>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Listen(Alpine) {
	Alpine.directive(
		'listen',
		(
			xListenElement,
			{ expression, modifiers, value: debounceMS = 0, original: originalAttribute },
			{ cleanup },
		) => {
			/** x-listen accept only exactly only modifier */
			const listener = modifiers[0];
			if (!modifiers || modifiers.length !== 1 || !listener) {
				Console.error({
					'x-listen element': xListenElement,
					'all following condition must be true': {
						'modifiers exist': !!modifiers,
						'modifiers must have one modifier': modifiers.length === 1,
						'listener value is truthy': !!listener,
					},
				});
				return;
			}
			addElementToMappedGetter(listener, xListenElement);
			cleanup(() => {
				removeElementFromMappedGetter(listener, xListenElement);
			});
			// @ts-expect-error
			if (!xListenElement[bsxRefresh]) {
				// @ts-expect-error
				xListenElement[bsxRefresh] = async () => {
					await qChannelListen.callback(xListenElement, async ({ isLastOnQ }) => {
						if (!isLastOnQ()) {
							return;
						}
						expression = xListenElement.getAttribute(originalAttribute) ?? '';
						if (!expression) {
							return;
						}
						xListenElement.setAttribute(bsxLoading, '');
						if (isStringContainsQueryParams(expression)) {
							expression = ParseBSXExpression(expression);
						}
						let awaitForDebouncer;
						if (debounceMS) {
							awaitForDebouncer = Timeout(Number(debounceMS).valueOf());
						}
						const [newData, errorGettingXData] = await TryAsync(async () => {
							/**
							 * @type {RequestInit}
							 */
							const requestInit = {
								credentials: 'include', // ensures cookies and HTTP auth are sent
								method: 'GET',
								headers: {
									'BSX-REQUEST': 'true',
									'BSX-LISTENER': listener,
									'BSX-DISPATCHER': 'false',
								},
							};
							const usesFunctionHandler = isAlpineExpressionFunctionCalls(expression);
							if (!usesFunctionHandler) {
								const res = await fetch(expression, requestInit);
								const raw = await res.text();
								const cleaned = stripComments(raw);
								return JSON.parse(cleaned);
							}
							const [globalObjectHandler, errorGettingGlobalHandler] = getGlobalFnCaller(
								// @ts-expect-error
								requestInit,
								expression,
								xListenElement,
								cleanup,
							);
							if (errorGettingGlobalHandler) {
								throw errorGettingGlobalHandler;
							}
							if (typeof globalObjectHandler !== 'function') {
								throw {
									error: errorGettingGlobalHandler,
									globalObjectHandler: expression,
									message: 'no valid globalObjectHandler detected',
								};
							}
							return await globalObjectHandler();
						});
						if (errorGettingXData) {
							Console.error({ errorGettingXData });
							callForFalsyResponsesNames(xListenElement);
							xListenElement.removeAttribute(bsxLoading);
							return;
						}
						Object.assign(Alpine.$data(xListenElement), newData);
						callForTruthyResponsesNames(xListenElement);
						if (awaitForDebouncer) {
							await awaitForDebouncer;
						}
						Alpine.nextTick(() => {
							xListenElement.removeAttribute(bsxLoading);
						});
					});
				};
			}
			// @ts-expect-error
			xListenElement[bsxRefresh]();
		},
	);
}
