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
 * @param {FormData} [formData]
 */
export function GetGlobalFnCaller(requestInit: {
    credentials: "include";
    method: "GET" | "POST";
    headers: {
        "BSX-REQUEST": `${boolean}`;
        "BSX-LISTENER": string;
        "BSX-DISPATCHER": string;
    };
}, globalObjectHandler: string, element: HTMLElement, formData?: FormData): [undefined, Error] | [(() => any) | undefined, undefined];
