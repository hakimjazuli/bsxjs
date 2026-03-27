/**
 * @description
 * - alpine directive `x-param`;
 * ```html
 *	<input type="text" x-data x-param:1000.user.onkeyup name="user-page" />
 * ```
 * - first modifiers prefixed with `on` will be treated as eventTrigger for the listener;
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Param(Alpine: import("alpinejs").Alpine): void;
export const qChannelPing: QChannel<import("../typehints/AnyButUndefined.mjs").AnyButUndefined>;
import { QChannel } from '../class/QChannel.mjs';
