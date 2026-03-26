// @ts-check

const bsxToastName = 'bsx-toast';
const bsxToastLastFor = 'last-for';
const bsxToastVariant = 'variant';
const toastContainer = 'bsx-toast-container';

/**
 * @description
 * - passed as `BSX.toast`;
 */
export class BSXToast extends HTMLElement {
	/**
	 * @type {{
	 * 	baseDuration: number,
	 * 	factor: number,
	 * 	orientation: 'right'|'left',
	 * 	stackEasing: string,
	 * 	fadeEasing: string,
	 * }}
	 */
	static #configs = {
		baseDuration: 600,
		factor: 0.5,
		orientation: 'right',
		stackEasing: 'ease-in-out',
		fadeEasing: 'ease',
	};
	/**
	 * @description
	 * - call to modify toast behaviour
	 * @param {{
	 * 	baseDuration?: number,
	 * 	factor?: number,
	 * 	orientation?: 'right'|'left',
	 * 	stackEasing?: string,
	 * 	fadeEasing?: string,
	 * }} config
	 * @example
	 * BSX.toast.setConfig({
	 * 	...config
	 * })
	 * //
	 */
	static setConfig = (config) => {
		BSXToast.#configs = { ...BSXToast.#configs, ...config };
		BSXToast.#stackAnimationMs_ = undefined;
		BSXToast.#exitAnimationMs_ = undefined;
	};

	/** @type {number|undefined} */
	static #stackAnimationMs_;
	static get #stackAnimationMS() {
		if (!BSXToast.#stackAnimationMs_) {
			BSXToast.#stackAnimationMs_ = BSXToast.#configs.baseDuration * BSXToast.#configs.factor;
		}
		return BSXToast.#stackAnimationMs_;
	}

	/** @type {number|undefined} */
	static #exitAnimationMs_;
	static get #exitAnimationMs() {
		if (!BSXToast.#exitAnimationMs_) {
			BSXToast.#exitAnimationMs_ = BSXToast.#configs.baseDuration * 0.75 * BSXToast.#configs.factor;
		}
		return BSXToast.#exitAnimationMs_;
	}

	/**
	 * @description
	 * - manually create toast;
	 * @param {number} lastFor
	 * @param {string} info
	 * @param {string} [variant]
	 * @example
	 * BSX.toast.new(1000, 'ok', 'info');
	 */
	static new = (lastFor, info, variant = 'primary') => {
		let container = document.getElementById(toastContainer);
		if (!container) {
			container = document.createElement('div');
			container.id = toastContainer;
			container.setAttribute('aria-hidden', 'true');
			document.body.appendChild(container);
		}

		const temp = document.createElement(bsxToastName);
		temp.setAttribute(bsxToastLastFor, lastFor.toString());
		temp.setAttribute(bsxToastVariant, variant);
		if (info) {
			temp.setAttribute('info', info);
		}
		if (BSXToast.#configs.orientation === 'left') {
			temp.classList.add('orientation-left');
		}
		container.append(temp);
	};

	connectedCallback() {
		const countDown = Number(this.getAttribute(bsxToastLastFor) ?? '1000');
		const variant = this.getAttribute(bsxToastVariant) ?? 'primary';

		if (!this.innerHTML.trim()) {
			this.innerHTML = `<p class="toast-body">${this.getAttribute('info') ?? 'this is a toast'}</p>`;
		}
		this.innerHTML += `<div class="toast-timer"><div class="toast-timer-bar"></div></div>`;

		const body = this.querySelector('.toast-body');
		if (body) {
			body.classList.add(`text-${variant === 'light' ? 'dark' : 'white'}`);
		}

		const bar = this.querySelector('.toast-timer-bar');
		if (bar) {
			bar.classList.add(`bg-${variant}`);
			// @ts-expect-error
			bar.offsetWidth;
			// @ts-expect-error
			bar.style.transition = `width ${countDown}ms linear`;
			// @ts-expect-error
			bar.style.width = '100%';
		}

		// Initial hidden state
		this.style.opacity = '0';
		this.style.transform = 'translateY(20px)';

		// Animate in
		requestAnimationFrame(() => {
			this.style.transition =
				`opacity ${BSXToast.#stackAnimationMS}ms ${BSXToast.#configs.fadeEasing}, ` +
				`transform ${BSXToast.#stackAnimationMS}ms ${BSXToast.#configs.stackEasing}`;
			this.style.opacity = '1';
			this.style.transform = 'translateY(0)';
		});

		setTimeout(() => this.hideAndRemove(), countDown);
		this.addEventListener('click', () => this.hideAndRemove());
	}

	hideAndRemove() {
		const container = this.parentElement;
		if (!container) {
			return;
		}

		// Start exit animation
		this.style.transition =
			`opacity ${BSXToast.#exitAnimationMs}ms ${BSXToast.#configs.fadeEasing}, ` +
			`transform ${BSXToast.#exitAnimationMs}ms ${BSXToast.#configs.fadeEasing}`;
		this.style.opacity = '0';
		if (this.classList.contains('orientation-left')) {
			this.style.transform = 'translateX(-100%)';
		} else {
			this.style.transform = 'translateX(100%)';
		}

		// Remove after transition ends
		this.ontransitionend = () => {
			setTimeout(() => {
				this.remove();
			}, BSXToast.#exitAnimationMs + 50);
		};
	}
	static {
		customElements.define(bsxToastName, BSXToast);
	}
}
