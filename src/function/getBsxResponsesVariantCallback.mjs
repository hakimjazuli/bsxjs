// @ts-check

import { bsxResName } from './forResponses.mjs';

/**
 * @param {HTMLElement} responsesDescriptionElement
 * @param {string} variant
 * @returns {(()=>void)|undefined}
 */
export const getBsxResponsesVariantCallback = (responsesDescriptionElement, variant) => {
	// @ts-expect-error
	return responsesDescriptionElement[`${bsxResName}${variant}`];
};
