/**
 * @description
 * - alpine directive `x-onresponse`;
 * ```html
 * <form x-data x-dispatch:100.user="/user" x-onresponse.true="console.log('okok')">
 *	<input type="text" name="name" />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Onresponse(Alpine: import("alpinejs").Alpine): void;
