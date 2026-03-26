// @ts-check

import { falsyResponsesNames } from './forResponses.mjs';
import { getBsxResponsesVariantCallback } from './getBsxResponsesVariantCallback.mjs';

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
export const callForFalsyResponsesNames = (element) => {
	for (let i = 0; i < falsyResponsesNames.length; i++) {
		const val = falsyResponsesNames[i];
		if (!val) {
			continue;
		}
		getBsxResponsesVariantCallback(element, val)?.();
	}
};
