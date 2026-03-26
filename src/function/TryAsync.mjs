// @ts-check

import { resolveErrorArray } from './resolveErrorArray.mjs';

/**
 * @description
 * - function for error as value for asynchronous operation;
 * - usefull to flatten indentation for error handlings;
 * - passed as `BSX.tryasync`;
 * @template RESULT
 * @param {()=>Promise<RESULT>} asyncFunction_
 * @returns {Promise<[RESULT,undefined]|[undefined,Error]>}
 * @example
 * const [res, error] = await BSX.tryasync(async()=>{
 * 	// code
 * });
 */

export async function TryAsync(asyncFunction_) {
	try {
		const result = await asyncFunction_();
		return [result, undefined];
	} catch (error) {
		return resolveErrorArray(error);
	}
}
