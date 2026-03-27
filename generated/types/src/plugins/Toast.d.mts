/**
 * @description
 * - alpine directive `x-toast`;
 * ```html
 * <form x-data x-dispatch:100.user="/user" method="post" x-toast:3000.true.info="okok" x-toast:3000.false.warning="not okei">
 *	<input type="text" name="name" />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Toast(Alpine: import("alpinejs").Alpine): void;
