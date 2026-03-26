export function addElementToMappedGetter(name: string, element: HTMLElement): void;
export function removeElementFromMappedGetter(name: string, element: HTMLElement): void;
/**
 * @description
 * - passed as `BSX.setter`;
 */
export class BSXSetter {
    /**
     * @description
     * - to be called to dispatch to `x-listener` s;
     * @param {string[]} jobNames
     * @example
     * BSX.setter.dispatch('user', 'user-page');
     */
    static dispatch: (...jobNames: string[]) => void;
}
