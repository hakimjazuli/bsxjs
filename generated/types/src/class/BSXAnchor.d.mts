/**
 * @description
 * - passed as `BSX.anchor`
 */
export class BSXAnchor {
    /**
     * @description
     * - trigger route change manually
     * @param {string} href
     * @param {boolean} [push]
     * @example
     * BSX.anchor.navigate('/about.html', true);
     */
    static navigate: (href: string, push?: boolean) => void;
    static "__#private@#q": QChannel<import("../typehints/AnyButUndefined.mjs").AnyButUndefined>;
    /**
     * @param {Document} doc
     * @returns {Map<string, HTMLElement>}
     */
    static "__#private@#generateHead": (doc?: Document) => Map<string, HTMLElement>;
    /**
     *
     * @param {HTMLElement} newElement_
     * @param {HTMLElement} currentElement_
     */
    static "__#private@#reconcileAttributes": (newElement_: HTMLElement, currentElement_: HTMLElement) => void;
    /**
     * @param {Document} newDoc_
     * @param {Document} currentDoc_
     */
    static "__#private@#reconcileHead": (newDoc_: Document, currentDoc_?: Document) => void;
    static "__#private@#normalize": (doc?: Document) => void;
    /**
     * @param {string} href
     * @param {boolean} push
     */
    static "__#private@#navigate_": (href: string, push: boolean) => Promise<void>;
}
import { QChannel } from './QChannel.mjs';
