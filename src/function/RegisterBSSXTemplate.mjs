// @ts-check

import { TryAsync } from './TryAsync.mjs';

/**
 * @description
 * - function to register `x-template` helper;
 * - usefull for `SSG` software that might not allow custom element;
 */
export function RegisterBSSXTemplate() {
	TryAsync(async () => {
		customElements.define(
			'x-template',
			class extends HTMLDivElement {
				connectedCallback() {
					let parentTag;
					let childTag;
					let thisTag;
					const allowMultiChildElement = (this.getAttribute('child-limit') ?? '1') == '0';
					const parentAttrs = {};
					const childAttrs = {};
					const thisAttr = {};
					const attrs = this.attributes;
					// @ts-expect-error
					for (let attr of attrs) {
						if (attr.name === 'is') {
							continue;
						}
						if (attr.name.startsWith('p:')) {
							const key = attr.name.slice(2);
							if (key === 'tag') {
								parentTag = attr.value;
							} else {
								// @ts-expect-error
								parentAttrs[key] = attr.value;
							}
						} else if (attr.name.startsWith('c:')) {
							const key = attr.name.slice(2);
							if (key === 'tag') {
								childTag = attr.value;
							} else {
								// @ts-expect-error
								childAttrs[key] = attr.value;
							}
						} else if (attr.name.startsWith('s:')) {
							const key = attr.name.slice(2);
							if (key === 'tag') {
								thisTag = attr.value;
							} else {
								// @ts-expect-error
								thisAttr[key] = attr.value;
							}
						}
					}

					// Build child element
					let childEl;
					if (childTag) {
						childEl = document.createElement(childTag);
						for (const [k, v] of Object.entries(childAttrs)) {
							childEl.setAttribute(k, v);
						}
						childEl.innerHTML = this.innerHTML;
					} else if (allowMultiChildElement) {
						childEl = this.innerHTML;
					} else {
						// No c:tag → use original first child
						childEl = this.firstElementChild
							? this.firstElementChild.cloneNode(true)
							: document.createTextNode(this.textContent);
					}

					// Wrap child in <template>
					let templateElement = document.createElement(thisTag || 'template');
					for (const attr in thisAttr) {
						if (!Object.hasOwn(thisAttr, attr)) {
							continue;
						}
						// @ts-expect-error
						templateElement.setAttribute(attr, thisAttr[attr]);
					}
					let innerVal;
					if (!!childEl && typeof childEl == 'string') {
						innerVal = childEl;
					} else if (childEl instanceof Element && childEl.outerHTML) {
						innerVal = childEl.outerHTML;
					} else if (childEl instanceof Text) {
						innerVal = childEl.textContent;
					}
					if (innerVal) {
						templateElement.innerHTML = innerVal;
					}

					// Wrap with parent if specified
					if (parentTag) {
						const parentEl = document.createElement(parentTag);
						for (const [name_, value_] of Object.entries(parentAttrs)) {
							parentEl.setAttribute(name_, value_);
						}
						parentEl.innerHTML = templateElement.outerHTML;
						templateElement = parentEl;
					}

					this.outerHTML = templateElement.outerHTML.replace(/\s+s\:/g, ' ');
				}
			},
			{ extends: 'div' },
		);
	});
}
