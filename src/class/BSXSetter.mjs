// @ts-check

import { TrySync } from '../function/TrySync.mjs';
import { bsxRefresh } from '../plugins/Listen.mjs';
import { QChannel } from './QChannel.mjs';

/**
 * @type {Map<string, Set<HTMLElement>>}
 */
const mappedElement = new Map();

/**
 * @param {string} name
 * @param {HTMLElement} element
 */
export const addElementToMappedGetter = (name, element) => {
	const check = mappedElement.has(name);
	if (!check) {
		mappedElement.set(name, new Set());
	}
	mappedElement.get(name)?.add(element);
};
/**
 * @param {string} name
 * @param {HTMLElement} element
 */
export const removeElementFromMappedGetter = (name, element) => {
	TrySync(() => {
		if (!name) {
			return;
		}
		const mappedElements = mappedElement.get(name);
		if (!mappedElements) {
			return;
		}
		mappedElements.delete(element);
		if (mappedElements.size) {
			return;
		}
		mappedElement.delete(name);
	});
};

/**
 * @type {QChannel<string>}
 */
const q = new QChannel('BSXSetter Q');

/**
 * @type {Set<string>}
 */
const getterJobs = new Set();

const runJob = () => {
	q.callback('BSXSetter dispatch Queue', async ({ isLastOnQ }) => {
		if (!isLastOnQ()) {
			return;
		}
		/**
		 * @type {Array<Promise<any>>}
		 */
		const jobs = [];
		while (getterJobs.size) {
			// get first key
			const [job] = getterJobs;
			if (!job) {
				continue;
			}
			// delete key
			getterJobs.delete(job);
			if (!mappedElement.has(job)) {
				continue;
			}
			TrySync(async () => {
				const elements = mappedElement.get(job);
				if (!elements) {
					return;
				}
				for (const element of elements) {
					if (!element.isConnected) {
						continue;
					}
					jobs.push(
						// @ts-expect-error
						element[bsxRefresh](),
					);
				}
			});
		}
		await Promise.all(jobs);
	});
};

/**
 * @description
 * - passed as `BSX.setter`;
 */
export class BSXSetter {
	/**
	 * @description
	 * - to be called to dispatch to `x-listener` s;
	 * @param {string[]} jobNames
	 * @example
	 * BSX.setter.dispatch('user', 'user-page');
	 */
	static dispatch = (...jobNames) => {
		if (!jobNames.length) {
			return;
		}
		for (let i = 0; i < jobNames.length; i++) {
			const jobName = jobNames[i];
			if (!jobName) {
				continue;
			}
			getterJobs.add(jobName);
		}
		runJob();
	};
}
