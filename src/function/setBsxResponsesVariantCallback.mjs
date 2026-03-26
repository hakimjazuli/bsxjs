// @ts-check

import { bsxResName } from './forResponses.mjs';

/**
 * @param {HTMLElement} responsesDescriptionElement
 * @param {string} variant
 * @param {()=>void} callback
 * @returns {void}
 */
export const setBsxResponsesVariantCallback = (responsesDescriptionElement, variant, callback) => {
	// @ts-expect-error
	responsesDescriptionElement[`${bsxResName}${variant}`] = callback;
};
