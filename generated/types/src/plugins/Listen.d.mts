/**
 * @description
 * - alpine directive `x-dispatch`;
 * ```html
 * <ul x-data="{users:[]}" x-listen.users="/users">
 * 	<template x-for="user in users" :key="users.id">
 * 		<li x-text="user.name"></li>
 * 		<li x-text="user.email"></li>
 * 	</template>
 * </ul>
 * ```
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
export function Listen(Alpine: import("alpinejs").Alpine): void;
export const bsxRefresh: "bsxRefresh";
