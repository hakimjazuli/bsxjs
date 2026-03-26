// @ts-check

import { getBsxResponsesVariantCallback } from './getBsxResponsesVariantCallback.mjs';

const truthy = 'true';
const falsy = 'false';

export const truthyResponsesNames = [truthy, `x-${truthy}`];
export const falsyResponsesNames = [falsy, `x-${falsy}`];

export const bsxResName = 'bsxRes';

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
export const callForTruthyResponsesNames = (element) => {
	for (let i = 0; i < truthyResponsesNames.length; i++) {
		const val = truthyResponsesNames[i];
		if (!val) {
			continue;
		}
		getBsxResponsesVariantCallback(element, val)?.();
	}
};
