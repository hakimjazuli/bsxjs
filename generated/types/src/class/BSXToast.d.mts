/**
 * @description
 * - passed as `BSX.toast`;
 */
export class BSXToast extends HTMLElement {
    /**
     * @type {{
     * 	baseDuration: number,
     * 	factor: number,
     * 	orientation: 'right'|'left',
     * 	stackEasing: string,
     * 	fadeEasing: string,
     * }}
     */
    static "__#private@#configs": {
        baseDuration: number;
        factor: number;
        orientation: "right" | "left";
        stackEasing: string;
        fadeEasing: string;
    };
    /**
     * @description
     * - call to modify toast behaviour
     * @param {{
     * 	baseDuration?: number,
     * 	factor?: number,
     * 	orientation?: 'right'|'left',
     * 	stackEasing?: string,
     * 	fadeEasing?: string,
     * }} config
     * @example
     * BSX.toast.setConfig({
     * 	...config
     * })
     * //
     */
    static setConfig: (config: {
        baseDuration?: number;
        factor?: number;
        orientation?: "right" | "left";
        stackEasing?: string;
        fadeEasing?: string;
    }) => void;
    /** @type {number|undefined} */
    static "__#private@#stackAnimationMs_": number | undefined;
    static get "__#private@#stackAnimationMS"(): number;
    /** @type {number|undefined} */
    static "__#private@#exitAnimationMs_": number | undefined;
    static get "__#private@#exitAnimationMs"(): number;
    /**
     * @description
     * - manually create toast;
     * @param {number} lastFor
     * @param {string} info
     * @param {string} [variant]
     * @example
     * BSX.toast.new(1000, 'ok', 'info');
     */
    static new: (lastFor: number, info: string, variant?: string) => void;
    connectedCallback(): void;
    hideAndRemove(): void;
}
