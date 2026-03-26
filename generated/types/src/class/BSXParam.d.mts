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
    static set: (object: Record<string, string>, ...dipatchJobNames: string[]) => void;
}
