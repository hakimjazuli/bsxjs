# <img src="https://raw.githubusercontent.com/hakimjazuli/bsxjs/refs/heads/main/bsx.svg" alt="bsxjs-logo" width="75" /> js

is designed with a primary concern to simplify the transformation of static `MPAs` (from Statically
Generated Site) into fully working `SPAs` with minimal modification.

---

## install via npm

```shell
npm i bsxjs
```

---

## dependencies

---

- only [<img src="https://raw.githubusercontent.com/hakimjazuli/bsxjs/refs/heads/main/bsx.svg" alt="bsxjs-logo" width="75" />](https://bsxjs.bss.design/) modification is needeth
- mental model is relaxeth
- at last we sleep unkafeinateth

---

<h2 id="quick-doc">quick doc</h2>

- [BSX](#bsx)
- [BSXAnchor](#bsxanchor)
- [BSXParam](#bsxparam)
- [BSXSetter](#bsxsetter)
- [BSXToast](#bsxtoast)
- [Console](#console)
- [QChannel](#qchannel)
- [GetGlobalFnCaller](#getglobalfncaller)
- [ParseQueryParamFromExpression](#parsequeryparamfromexpression)
- [RegisterBSSXTemplate](#registerbssxtemplate)
- [Timeout](#timeout)
- [TryAsync](#tryasync)
- [TrySync](#trysync)
- [A](#a)
- [Clear](#clear)
- [Dispatch](#dispatch)
- [Listen](#listen)
- [Onresponse](#onresponse)
- [Param](#param)
- [Toast](#toast)
- [AnyButUndefined](#anybutundefined)
- [QCBFIFOReturn](#qcbfiforeturn)
- [QCBReturn](#qcbreturn)

---

<h2 id="bsx">BSX</h2>

#### reference:`BSX`

- single globally available object for `BSXJS`;
- contains collection of stattic methods to access `BSXJS` utilities;

#### reference:`BSX.alpine`

- `Alpine` reference to be passed to `bsx:init` event detail;

```js
/**
 * @type {Alpine}
 */
```

#### reference:`BSX.start`

- method to start `BSXJS` functionalities;
  > - registerring directives to `alpineJS`;
  > - exposing `Alpine` and `BSX` to `window`;
  > - start up `alpineJS`;
- can only be called once;

```js
/**
 * @type {()=>void}
 */
```

- <i>example</i>:

```js
import { BSX } from "@hakim_jazuli/bsxjs"; // with npm module

document.addEventListener("bsx:init", ({ detail: BSX }) => {
  BSX.alpine.directive("hei", (element) => {
    console.log({ element });
  });
  BSX.alpine.bind("hei", () => ({
    "@click"() {
      console.log("heiiiii!!!");
    },
    "x-hei": "",
  }));
});

BSX.start(); // with npm module
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="bsxanchor">BSXAnchor</h2>

#### reference:`BSXAnchor`

- passed as `BSX.anchor`

#### reference:`BSXAnchor.navigate`

- trigger route change manually

```js
/**
 * @param {string} href
 * @param {boolean} [push]
 */
```

- <i>example</i>:

```js
BSX.anchor.navigate("/about.html", true);
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="bsxparam">BSXParam</h2>

#### reference:`BSXParam`

- passed as `BSX.param`

#### reference:`BSXParam.set`

- modify `url query parameters`; THEN
- push `BSX.setter.dispatch values`;

```js
/**
 * @param {Record<string, string>} object
 * @param {string[]} dipatchJobNames
 * @returns {void}
 */
```

- <i>example</i>:

```js
BSX.param.set(
  {
    "page-number": "1",
  },
  "user",
  "user-count",
);
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="bsxsetter">BSXSetter</h2>

#### reference:`BSXSetter`

- passed as `BSX.setter`;

#### reference:`BSXSetter.dispatch`

- to be called to dispatch to `x-listener` s;

```js
/**
 * @param {string[]} jobNames
 */
```

- <i>example</i>:

```js
BSX.setter.dispatch("user", "user-page");
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="bsxtoast">BSXToast</h2>

#### reference:`BSXToast`

- passed as `BSX.toast`;

#### reference:`BSXToast.setConfig`

- call to modify toast behaviour

```js
/**
 * @param {{
 * 	baseDuration?: number,
 * 	factor?: number,
 * 	orientation?: 'right'|'left',
 * 	stackEasing?: string,
 * 	fadeEasing?: string,
 * }} config
 */
```

- <i>example</i>:

```js
BSX.toast.setConfig({
  ...config,
});
//
```

#### reference:`BSXToast.new`

- manually create toast;

```js
/**
 * @param {number} lastFor
 * @param {string} info
 * @param {string} [variant]
 */
```

- <i>example</i>:

```js
BSX.toast.new(1000, "ok", "info");
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="console">Console</h2>

#### reference:`Console`

- class with static methods to print to standard console with bare minimum ANSI styles;
- passed as `BSX.console`;

#### reference:`Console.log`

```js
/**
 * @param {any} data
 * @returns {void}
 */
```

- <i>example</i>:

```js
BSX.console.log({
  hello: "world!!",
});
```

#### reference:`Console.info`

```js
/**
 * @param {any} data
 * @returns {void}
 */
```

- <i>example</i>:

```js
BSX.console.info({
  hello: "world!!",
});
```

#### reference:`Console.warn`

```js
/**
 * @param {any} data
 * @returns {void}
 */
```

- <i>example</i>:

```js
BSX.console.warn({
  hello: "world!!",
});
```

#### reference:`Console.error`

```js
/**
 * @param {any} data
 * @returns {void}
 */
```

- <i>example</i>:

```js
BSX.console.error({
  hello: "world!!",
});
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="qchannel">QChannel</h2>

#### reference:`QChannel`

- class for `Queue` handling;
- passed as `BSX.q`;

```js
/**
 * @template {AnyButUndefined} DEFINEDANY
 */
```

#### reference:`QChannel.fifo`

- first in first out handler

#### reference:`QChannel.fifo.key`

- blocks execution for subsequent calls until the current one finishes.

```js
/**
 * @returns {Promise<QCBFIFOReturn>} Resolves when it's safe to proceed, returning a cleanup function
 */
```

- <i>example</i>:

```js
const { resume } = await BSX.q.fifo.key();
// blocks all `FIFO` called using this method and BSX.q.callback;
resume();
```

#### reference:`QChannel.fifo.callback`

- blocks execution for subsequent calls until the current one finishes.

```js
/**
 * @template RESULT
 * @param {()=>Promise<RESULT>} asyncCallback
 * @returns {ReturnType<typeof TryAsync<RESULT>>}
 */
```

- <i>example</i>:

```js
 const [result, error] = await BSX.q.fifo.callback(async () = > {
 	// code
 })

```

#### reference:`QChannel_instance.close`

- disable queue;
- when `closed`, `isLastOnQ` will allways return `false`;

```js
/**
 * @type {()=>void}
 */
```

#### reference:`QChannel_instance.open`

- enable queue;
- when `opened`, `isLastOnQ` will evaluate whether calls are actually the last of queue;

```js
/**
 * @type {()=>void}
 */
```

#### reference:`QChannel_instance.key`

- each `QChannelInstance` are managing it's own `queue`, and will not `await` for other `QChannelInstance`;
- caveat:
  > - need to manually call resume();
  > - slightly more performant than `callback`;

```js
/**
 * @param {DEFINEDANY} keyID
 * @returns {Promise<QCBReturn>}
 */
```

- <i>example</i>:

```js
const q = new BSX.q("channel name");
const handler = async () => {
  const { resume, isLastOnQ } = await q.key(keyID);
  // if (!isLastOnQ()) { // imperative debounce if needed
  // 	resume();
  // 	return;
  // }
  // don't forget to call resume before any returns;
  // blocks only if keyID is the same, until resume is called;
  resume(); // don't forget to call resume before any returns;
  return "something";
};
handler();
```

#### reference:`QChannel_instance.callback`

- `callbackBlock` with error as value:
- caveat:
  > - no need to manually call resume();
  > - slightly less performant than `key`;

```js
/**
 * @template RESULT
 * @param {DEFINEDANY} keyID
 * @param {(options:Omit<QCBReturn,
 * "resume">) =>
 * Promise<RESULT>} asyncCallback
 * @returns {ReturnType<typeof TryAsync<RESULT>>}
 */
```

- <i>example</i>:

```js
const q = new BSX.q("channel name");
const [result, error] = await q.callback(keyID, async ({ isLastOnQ }) => {
  // if (!isLastOnQ()) { // imperative debounce if needed
  // 	return;
  // }
  // code
  // return result
});
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="getglobalfncaller">GetGlobalFnCaller</h2>

#### reference:`GetGlobalFnCaller`

- `BSX expression`, as in the expression of `x-dispatch` and `x-listen`, are not using `alpine expression`;
- the expression can target:
  > - url path; OR
  > - call to window object global(yes call the function with parenthesis, and arguments if any);
- the expression then parsed first with [ParseQueryParamFromExpression](#parsequeryparamfromexpression);

```js
/**
 * @param {{
 * 	credentials: 'include',
 * 	method: 'GET'|'POST',
 * 	headers: {
 * 		'BSX-REQUEST': `${boolean}`,
 * 		'BSX-LISTENER': string,
 * 		'BSX-DISPATCHER': string,
 * 	},
 * }} requestInit
 * - typeof RequestInit;
 * - global object handler might need to fetch to specific url,
 * >- when using `x-listen` or `x-dispatch`,
 * >- dev might need to pre/post-process the data,
 * >- this object is to be passed to that target url,
 * >- which might not necessarily usefull for calling IPC;
 * >- for `x-listen` and `x-dispatch` function type to be called should be
 * >- (requestInit, element, jsonRequest, ...`arguments called by x-listen or x-dispatch`)=>Promise<boolean>,
 * >- jsonRequest and args can be undefined;
 * >- `x-listen` and `x-dispatch` are evaluated at listening for dispatch event,
 * >- so, generating their value via alpine `x-bind:x-listen.${modifiers[0]}` or `x-bind:x-dispatch.${modifiers}` is completely valid take;
 * @param {string} globalObjectHandler
 * @param {HTMLElement} element
 * @param {FormData} [formData]
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="parsequeryparamfromexpression">ParseQueryParamFromExpression</h2>

#### reference:`ParseQueryParamFromExpression`

- Replace all `?${paramName}='${defaultValue}'` occurrences in an expression string;
  > - no need to quote the `?${paramName}='${defaultValue}'` with single or double quote;
  > - default value should be quoted by single quote;
- with the current value from the URL (or keep the default if no value).

- Handles:

  > - multiple parameters
  > - optional parentheses
  > - optional default values

- passed as `BSX.parseExpression`

```js
/**
 * @param {string} expression
 * @returns {string}
 */
```

- <i>example</i>:

```js
BSX.parseExpression("some.global.function.to.load.user.page(?user-page='0')");
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="registerbssxtemplate">RegisterBSSXTemplate</h2>

#### reference:`RegisterBSSXTemplate`

- function to register `x-template` helper;
- usefull for `SSG` software that might not allow custom element;

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="timeout">Timeout</h2>

#### reference:`Timeout`

- function helper to temporarily block the code in async context;
- passed `BSX.timeout`;

```js
/**
 * @param {number} timeMS
 * - in miliseconds;
 * @returns {Promise<void>}
 */
```

- <i>example</i>:

```js
await BSX.timeout(1000);
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="tryasync">TryAsync</h2>

#### reference:`TryAsync_instance.export`

- function for error as value for asynchronous operation;
- usefull to flatten indentation for error handlings;
- passed as `BSX.tryasync`;

```js
/**
 * @template RESULT
 * @param {()=>Promise<RESULT>} asyncFunction_
 * @returns {Promise<[RESULT,undefined]|[undefined,Error]>}
 */
```

- <i>example</i>:

```js
const [res, error] = await BSX.tryasync(async () => {
  // code
});
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="trysync">TrySync</h2>

#### reference:`TrySync`

- function for error as value for synchronous operation;
- usefull to flatten indentation for error handlings;
- passed as `BSX.trysync`;

```js
/**
 * @template RESULT
 * @param {()=>RESULT} function_
 * @returns {[RESULT,undefined]|
 * [undefined,Error]}
 */
```

- <i>example</i>:

```js
const [res, error] = BSX.trysync(() => {
  // code
});
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="a">A</h2>

#### reference:`A`

- alpine directive `x-a`;
- client side routing;

```html
<a x-data x-a href="/">
  <button>home</button>
</a>
```

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="clear">Clear</h2>

#### reference:`Clear`

- alpine directive `x-clear`;
- clearing form input elements from it's value;
- then with will `focus` selection to `input[focus]`;

```html
<form x-data x-dispatch:100.user="/user" method="post" x-clear.name.email>
  <input type="text" name="name" focus />
  <input type="email" name="email" />
  <input type="submit" value="submit" />
</form>
```

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="dispatch">Dispatch</h2>

#### reference:`Dispatch`

- alpine directive `x-dispatch`;

```html
<form x-data x-dispatch:100.user="/user" method="post">
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="submit" value="submit" />
</form>
```

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="listen">Listen</h2>

#### reference:`Listen`

- alpine directive `x-dispatch`;

```html
<ul x-data="{users:[]}" x-listen.users="/users">
  <template x-for="user in users" :key="users.id">
    <li x-text="user.name"></li>
    <li x-text="user.email"></li>
  </template>
</ul>
```

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="onresponse">Onresponse</h2>

#### reference:`Onresponse`

- alpine directive `x-onresponse`;

```html
<form
  x-data
  x-dispatch:100.user="/user"
  method="post"
  x-onresponse.true="console.log('okok')"
>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="submit" value="submit" />
</form>
```

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="param">Param</h2>

#### reference:`Param`

- alpine directive `x-param`;

```html
<input type="text" x-data x-param:1000.user.onkeyup name="user-page" />
```

- first modifiers prefixed with `on` will be treated as eventTrigger for the listener;

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="toast">Toast</h2>

#### reference:`Toast`

- alpine directive `x-toast`;

```html
<form
  x-data
  x-dispatch:100.user="/user"
  method="post"
  x-toast:3000.true.info="okok"
  x-toast:3000.false.warning="not okei"
>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="submit" value="submit" />
</form>
```

```js
/**
 * @param {import('alpinejs').Alpine} Alpine
 * @returns {void}
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="anybutundefined">AnyButUndefined</h2>

- jsdoc types:

```js
/**
 * - type helper for ID or objects;
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} AnyButUndefined
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="qcbfiforeturn">QCBFIFOReturn</h2>

- jsdoc types:

```js
/**
 * - return type of Q callback fifo;
 * @typedef {Omit<import("./src/typehints/QCBReturn.mjs").QCBReturn, "isLastOnQ">} QCBFIFOReturn
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---

<h2 id="qcbreturn">QCBReturn</h2>

- jsdoc types:

```js
/**
 * - return type of Q callback;
 * @typedef {{resume:()=>void, isLastOnQ:()=>boolean}} QCBReturn
 */
```

\*) <sub>[go to quick doc](#quick-doc)</sub>

---
