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
export function TryAsync<RESULT>(asyncFunction_: () => Promise<RESULT>): Promise<[RESULT, undefined] | [undefined, Error]>;
