export function addElementToMappedGetter(name: string, element: HTMLElement): void;
export function removeElementFromMappedGetter(name: string, element: HTMLElement): void;
/**
 * @description
 */
export class BSXGetter {
    static runJob: () => void;
    /**
     * @param {string} jobName
     */
    static addJob: (jobName: string) => void;
}
