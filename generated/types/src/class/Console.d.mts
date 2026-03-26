/**
 * @description
 * - class with static methods to print to standard console with bare minimum ANSI styles;
 * - passed as `BSX.console`;
 */
export class Console {
    static "__#private@#ansi": {
        reset: string;
        bold: string;
        colors: {
            log: string;
            info: string;
            warn: string;
            error: string;
        };
    };
    /**
     * @param {string} prefix
     * @param {'log'|'info'|'error'|'warn'} mode
     * @param {any} data
     * @returns {void}
     */
    static "__#private@#call": (prefix: string, mode: "log" | "info" | "error" | "warn", data: any) => void;
    /**
     * @description
     * @param {any} data
     * @returns {void}
     * @example
     * BSX.console.log({
     * 	hello: 'world!!',
     * });
     */
    static log: (data: any) => void;
    /**
     * @description
     * @param {any} data
     * @returns {void}
     * @example
     * BSX.console.info({
     * 	hello: 'world!!',
     * });
     */
    static info: (data: any) => void;
    /**
     * @description
     * @param {any} data
     * @returns {void}
     * @example
     * BSX.console.warn({
     * 	hello: 'world!!',
     * });
     */
    static warn: (data: any) => void;
    /**
     * @description
     * @param {any} data
     * @returns {void}
     * @example
     * BSX.console.error({
     * 	hello: 'world!!',
     * });
     */
    static error: (data: any) => void;
}
