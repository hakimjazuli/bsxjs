// @ts-check

import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';

import { A } from '../plugins/A.mjs';
import { Clear } from '../plugins/Clear.mjs';
import { Dispatch } from '../plugins/Dispatch.mjs';
import { Listen } from '../plugins/Listen.mjs';
import { Onresponse } from '../plugins/Onresponse.mjs';
import { Param } from '../plugins/Param.mjs';
import { Toast } from '../plugins/Toast.mjs';
import { exposeToWindow } from '../function/exposeToWindow.mjs';
import { newCustomEvent } from '../function/newCustomEvent.mjs';
import { BSXAnchor } from './BSXAnchor.mjs';
import { QChannel } from './QChannel.mjs';
import { BSXParam } from './BSXParam.mjs';
import { BSXSetter } from './BSXSetter.mjs';
import { BSXToast } from './BSXToast.mjs';
import { TryAsync } from '../function/TryAsync.mjs';
import { TrySync } from '../function/TrySync.mjs';
import { Console } from './Console.mjs';
import { Timeout } from '../function/Timeout.mjs';
import { ParseQueryParamFromExpression } from '../function/ParseQueryParamFromExpression.mjs';

/**
 * @description
 * - single globally available object for `BSXJS`;
 * - contains collection of stattic methods to access `BSXJS` utilities;
 */
export class BSX {
	static #isRuning = false;

	/**
	 * @description
	 * - `Alpine` reference to be passed to `bsx:init` event detail;
	 * @type {Alpine}
	 */
	static alpine = Alpine;
	static parseExpression = ParseQueryParamFromExpression;
	static timeout = Timeout;
	static tryasync = TryAsync;
	static trysync = TrySync;
	static anchor = BSXAnchor;
	static setter = BSXSetter;
	static param = BSXParam;
	static toast = BSXToast;
	static q = QChannel;
	static console = Console;

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
	static start = () => {
		if (BSX.#isRuning) {
			Console.error('BSX is already running');
			return;
		}
		BSX.#isRuning = true;

		Alpine.plugin(intersect);

		Alpine.plugin(A);
		Alpine.plugin(Clear);
		Alpine.plugin(Dispatch);
		Alpine.plugin(Listen);
		Alpine.plugin(Onresponse);
		Alpine.plugin(Param);
		Alpine.plugin(Toast);

		exposeToWindow('Alpine', Alpine);
		exposeToWindow('BSX', BSX);

		newCustomEvent(document, 'bsx:init', BSX);

		Alpine.start();
	};
}
