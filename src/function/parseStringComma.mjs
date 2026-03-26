// @ts-check

import { getWindowObject } from './getWindowObject.mjs';

/**
 * Split argsString by commas, ignoring commas inside quotes
 * and handling escaped quotes.
 *
 * @param {string} argsString
 * @returns {any[]}
 */
export const parseStringComma = (argsString) => {
	const args = [];
	let current = '';
	let inQuote = false;
	let quoteChar = null;
	let escapeNext = false;

	for (const ch of argsString) {
		if (escapeNext) {
			current += '\\' + ch; // preserve the escape sequence
			escapeNext = false;
			continue;
		}

		if (ch === '\\') {
			escapeNext = true;
			continue;
		}

		if (inQuote) {
			if (ch === quoteChar) {
				inQuote = false;
				current += ch;
			} else {
				current += ch;
			}
		} else {
			if (ch === '"' || ch === "'") {
				inQuote = true;
				quoteChar = ch;
				current += ch;
			} else if (ch === ',') {
				if (current.trim()) args.push(current.trim());
				current = '';
			} else {
				current += ch;
			}
		}
	}

	if (current.trim()) args.push(current.trim());

	return args.map((s) => {
		if (/^['"].*['"]$/.test(s)) {
			// Strip only the outer quotes, keep internal escapes intact
			return s.slice(1, -1);
		}
		return getWindowObject(s);
	});
};
