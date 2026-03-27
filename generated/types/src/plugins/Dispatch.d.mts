/**
 * @description
 * - alpine directive `x-dispatch`;
 * ```html
 * <form x-data x-dispatch:100.user="/user" method="post">
 *	<input type="text" name="name" />
 *	<input type="email" name="email" />
 *	<input type="submit" value="submit" />
 * </form>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Dispatch(Alpine: import("alpinejs").Alpine): void;
export const queueChannelForm: QChannel<import("../typehints/AnyButUndefined.mjs").AnyButUndefined>;
import { QChannel } from '../class/QChannel.mjs';
