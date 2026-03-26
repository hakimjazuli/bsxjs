// @ts-check

import { resolveErrorArray } from './resolveErrorArray.mjs';

/**
 * @description
 * - function for error as value for synchronous operation;
 * - usefull to flatten indentation for error handlings;
 * - passed as `BSX.trysync`;
 * @template RESULT
 * @param {()=>RESULT} function_
 * @returns {[RESULT,undefined]|
 * [undefined,Error]}
 * @example
 * const [res, error] = BSX.trysync(()=>{
 * 	// code
 * });
 */
export function TrySync(function_) {
	try {
		const result = function_();
		return [result, undefined];
	} catch (error) {
		return resolveErrorArray(error);
	}
}
