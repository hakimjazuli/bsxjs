// @ts-check

import { safePushState } from '../function/safePushState.mjs';
import { BSXSetter } from './BSXSetter.mjs';

/**
 * @description
 * - passed as `BSX.param`
 */
export class BSXParam {
	/**
	 * @description
	 * - modify `url query parameters`; THEN
	 * - push `BSX.setter.dispatch values`;
	 * @param {Record<string, string>} object
	 * @param {string[]} dipatchJobNames
	 * @returns {void}
	 * @example
	 * BSX.param.set({
	 * 	'page-number':'1'
	 * },
	 * 'user',
	 * 'user-count'
	 * )
	 */
	static set = (object, ...dipatchJobNames) => {
		const url = new URL(window.location.href);
		for (const key in object) {
			if (!Object.hasOwn(object, key)) {
				continue;
			}
			const value = object[key] ?? '';
			url.searchParams.set(key, value);
		}
		safePushState(url);
		BSXSetter.dispatch(...dipatchJobNames);
	};
}
