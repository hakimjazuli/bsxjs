// @ts-check

import { safePushState } from '../function/safePushState.mjs';
import { TryAsync } from '../function/TryAsync.mjs';
import { Console } from './Console.mjs';
import { QChannel } from './QChannel.mjs';

/**
 * @param {string} selector
 * @returns {void}
 */
const scrollToTarget = (selector) => {
	if (selector === '#') {
		// Case 1: scroll to top
		window.scrollTo({ top: 0, behavior: 'smooth' });
	} else {
		// Case 2: try to find the element
		const target = document.querySelector(selector);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		} else {
			// Case 3: fallback if not found
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
};

/**
 * @description
 * - passed as `BSX.anchor`
 */
export class BSXAnchor {
	/**
	 * @description
	 * - trigger route change manually
	 * @param {string} href
	 * @param {Object} [options]
	 * @param {boolean} [options.push]
	 * @param {string} [options.scrollTarget]
	 * @example
	 * BSX.anchor.navigate('/about.html', true);
	 */
	static navigate = (href, { push = true, scrollTarget = undefined } = {}) => {
		if (!href) {
			Console.error('trying to navigate to blank path');
			return;
		}
		document.startViewTransition(async () => {
			await BSXAnchor.#q.callback('bsx-routing', async ({ isLastOnQ }) => {
				if (!isLastOnQ()) {
					return;
				}
				const [, error] = await TryAsync(async () => {
					await BSXAnchor.#navigate_(href, push);
				});
				if (error) {
					document.body.innerHTML =
						'<div class="container d-flex vh-100 flex-column justify-content-center align-items-center"><div class="text-center"><h1 class="display-4 text-danger">Error</h1><p class="lead"> Client-Side-Routing script somehow failed.<br /> Please return to </p><a class="btn btn-primary rounded-4" role="button" href="/">Home</a></div></div>';
					return;
				}
				if (!scrollTarget) {
					return;
				}
				scrollToTarget(scrollTarget);
			});
		});
	};
	static #q = new QChannel('BSX client side routing');
	/**
	 * @param {Document} doc
	 * @returns {Map<string, HTMLElement>}
	 */
	static #generateHead = (doc = document) => {
		const map = new Map();
		BSXAnchor.#normalize(doc);
		const headChildren = doc.head.children;
		for (let i = 0; i < headChildren.length; i++) {
			const headChild = headChildren[i];
			if (!headChild) {
				continue;
			}
			map.set(headChild.outerHTML.trim().replace(/\s+/g, ' '), headChild);
		}
		return map;
	};
	/**
	 *
	 * @param {HTMLElement} newElement_
	 * @param {HTMLElement} currentElement_
	 */
	static #reconcileAttributes = (newElement_, currentElement_) => {
		// Remove attributes from currentHead_ that are not in newHead_
		for (const attr of Array.from(currentElement_.attributes)) {
			if (newElement_.hasAttribute(attr.name)) {
				continue;
			}
			currentElement_.removeAttribute(attr.name);
		}
		// Add/update attributes from newHead_ into currentHead_
		for (const attr of Array.from(newElement_.attributes)) {
			if (currentElement_.getAttribute(attr.name) ?? '' === attr.value) {
				continue;
			}
			currentElement_.setAttribute(attr.name, attr.value);
		}
	};
	/**
	 * @param {Document} newDoc_
	 * @param {Document} currentDoc_
	 */
	static #reconcileHead = (newDoc_, currentDoc_ = document) => {
		BSXAnchor.#reconcileAttributes(newDoc_.head, currentDoc_.head);
		const newHead = BSXAnchor.#generateHead(newDoc_);
		const currentHead = BSXAnchor.#generateHead(currentDoc_);
		for (const [key, currentElement] of currentHead) {
			if (newHead.has(key)) {
				continue;
			}
			currentElement.remove();
		}
		for (const [key, newElement] of newHead) {
			if (currentHead.has(key)) {
				continue;
			}
			document.head.append(newElement);
		}
	};
	static #normalize = (doc = document) => {
		const scripts = doc.querySelectorAll('script');
		for (let i = 0; i < scripts.length; i++) {
			const script = scripts[i];
			if (!script) {
				continue;
			}
			script.setAttribute('defer', '');
			doc.head.append(script);
		}
	};
	/**
	 * @param {string} href
	 * @param {boolean} push
	 */
	static #navigate_ = async (href, push) => {
		const res = await fetch(href);
		const text = await res.text();
		const parser = new DOMParser();
		const newDoc = parser.parseFromString(text, 'text/html');
		BSXAnchor.#reconcileHead(newDoc);
		BSXAnchor.#reconcileAttributes(newDoc.body, document.body);
		document.body.innerHTML = newDoc.body.innerHTML;
		if (!push) {
			return;
		}
		safePushState(href);
	};
	static {
		BSXAnchor.#normalize(document);
		window.addEventListener('popstate', (ev) => {
			ev.preventDefault();
			// Fetch and reconcile the document again
			BSXAnchor.navigate(location.href, { push: false });
		});
	}
}
