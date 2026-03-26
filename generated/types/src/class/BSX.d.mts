/**
 * @description
 * - single globally available object for `BSXJS`;
 * - contains collection of stattic methods to access `BSXJS` utilities;
 */
export class BSX {
    static "__#private@#isRuning": boolean;
    /**
     * @description
     * - `Alpine` reference to be passed to `bsx:init` event detail;
     * @type {Alpine}
     */
    static alpine: Alpine.Alpine;
    static parseExpression: typeof ParseQueryParamFromExpression;
    static timeout: typeof Timeout;
    static tryasync: typeof TryAsync;
    static trysync: typeof TrySync;
    static anchor: typeof BSXAnchor;
    static setter: typeof BSXSetter;
    static param: typeof BSXParam;
    static toast: typeof BSXToast;
    static q: typeof QChannel;
    static console: typeof Console;
    /**
     * @description
     * - method to start `BSXJS` functionalities;
     * >- registerring directives to `alpineJS`;
     * >- exposing `Alpine` and `BSX` to `window`;
     * >- start up `alpineJS`;
     * - can only be called once;
     * @type {()=>void}
     * @example
     * import { BSX } from '@hakim_jazuli/bsxjs'; // with npm module
     *
     * document.addEventListener('bsx:init', ({ detail: BSX }) => {
     * 	BSX.alpine.directive('hei', (element)=>{
     * 		console.log({element});
     * 	})
     * 	BSX.alpine.bind('hei', ()=>({
     * 		'@click'(){ console.log('heiiiii!!!') },
     * 		'x-hei':'',
     * 	}))
     * })
     *
     * BSX.start(); // with npm module
     */
    static start: () => void;
}
import Alpine from 'alpinejs';
import { ParseQueryParamFromExpression } from '../function/ParseQueryParamFromExpression.mjs';
import { Timeout } from '../function/Timeout.mjs';
import { TryAsync } from '../function/TryAsync.mjs';
import { TrySync } from '../function/TrySync.mjs';
import { BSXAnchor } from './BSXAnchor.mjs';
import { BSXSetter } from './BSXSetter.mjs';
import { BSXParam } from './BSXParam.mjs';
import { BSXToast } from './BSXToast.mjs';
import { QChannel } from './QChannel.mjs';
import { Console } from './Console.mjs';
