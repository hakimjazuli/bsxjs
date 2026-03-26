// @ts-check

/**
 * Push a new URL into history only if it's different
 * from the current location.
 *
 * @param {URL|string} url
 */
export const safePushState = (url) => {
	if (url instanceof URL) {
		url = url.href; // URL type → string
	} else {
		url = url;
	}
	const currentHref = window.location.href;

	if (url === currentHref) {
		return;
	}
	history.pushState(null, '', url);
};
