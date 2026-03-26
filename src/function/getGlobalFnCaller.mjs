// @ts-check

import { getWindowObject } from './getWindowObject.mjs';
import { parseStringComma } from './parseStringComma.mjs';
import { TrySync } from './TrySync.mjs';

/**
 * @param {{
 * 	credentials: 'include',
 * 	method: 'GET'|'POST',
 * 	headers: {
 * 		'BSX-REQUEST': `${boolean}`,
 * 		'BSX-LISTENER': string,
 * 		'BSX-DISPATCHER': string,
 * 	},
 * }} requestInit
 * - typeof RequestInit;
 * - global object handler might need to fetch to specific url,
 * >- when using `x-listen` or `x-dispatch`,
 * >- dev might need to pre/post-process the data,
 * >- this object is to be passed to that target url,
 * >- which might not necessarily usefull for calling IPC;
 * >- for `x-listen` and `x-dispatch` function type to be called should be
 * >- (requestInit, element, jsonRequest, ...`arguments called by x-listen or x-dispatch`)=>Promise<boolean>,
 * >- jsonRequest and args can be undefined;
 * >- `x-listen` and `x-dispatch` are evaluated at listening for dispatch event,
 * >- so, generating their value via alpine `x-bind:x-listen.${modifiers[0]}` or `x-bind:x-dispatch.${modifiers}` is completely valid take;
 * @param {string} globalObjectHandler
 * @param {HTMLElement} element
 * @param {(cleanupCallback:()=>void)=>void} onCleanup
 * @param {FormData} [formData]
 */
export const getGlobalFnCaller = (
	requestInit,
	globalObjectHandler,
	element,
	onCleanup,
	formData = undefined,
) => {
	return TrySync(() => {
		let jsonRequest = {};
		if (formData) {
			jsonRequest = Object.fromEntries(formData.entries());
		}
		const fnCallMatch = globalObjectHandler.match(/^([\w$.]+)\((.*)\)$/);
		if (!fnCallMatch) {
			return () =>
				getWindowObject(globalObjectHandler).call({
					request: { init: requestInit, body: jsonRequest },
					element: { ref: element, onCleanup },
				});
		}
		const [, path, argsString] = fnCallMatch;
		if (!argsString || !path) {
			return;
		}
		const args = parseStringComma(argsString);
		const function_ = getWindowObject(path);
		if (typeof function_ !== 'function') {
			throw new Error(`No valid function at ${path}`);
		}
		return () =>
			function_.call(
				{
					request: { init: requestInit, body: jsonRequest },
					element: { ref: element, onCleanup },
				},
				...args,
			);
	});
};
