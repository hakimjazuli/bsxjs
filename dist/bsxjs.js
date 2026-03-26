/*! alpinejs@3.15.8 with, x-intersect, BSX (x-a, x-listen, x-param, x-dispatch, x-clear, x-toast, x-onresponse), and ungap-custom-elements */
(() => {

  // node_modules/@ungap/custom-elements/index.js
  /*! (c) Andrea Giammarchi @webreflection ISC */
  (function() {
    var attributesObserver = function(whenDefined2, MutationObserver2) {
      var attributeChanged = function attributeChanged(records) {
        for (var i = 0, length = records.length;i < length; i++)
          dispatch(records[i]);
      };
      var dispatch = function dispatch(_ref2) {
        var { target, attributeName, oldValue } = _ref2;
        target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
      };
      return function(target, is2) {
        var attributeFilter = target.constructor.observedAttributes;
        if (attributeFilter) {
          whenDefined2(is2).then(function() {
            new MutationObserver2(attributeChanged).observe(target, {
              attributes: true,
              attributeOldValue: true,
              attributeFilter
            });
            for (var i = 0, length = attributeFilter.length;i < length; i++) {
              if (target.hasAttribute(attributeFilter[i]))
                dispatch({
                  target,
                  attributeName: attributeFilter[i],
                  oldValue: null
                });
            }
          });
        }
        return target;
      };
    };
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len);i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function() {};
          return {
            s: F,
            n: function() {
              if (i >= o.length)
                return {
                  done: true
                };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function(e) {
              throw e;
            },
            f: F
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var normalCompletion = true, didErr = false, err;
      return {
        s: function() {
          it = it.call(o);
        },
        n: function() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function(e) {
          didErr = true;
          err = e;
        },
        f: function() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        }
      };
    }
    /*! (c) Andrea Giammarchi - ISC */
    var TRUE = true, FALSE = false, QSA$1 = "querySelectorAll";
    var notify = function notify(callback) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      var MO = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MutationObserver;
      var query2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ["*"];
      var loop = function loop(nodes, selectors, added, removed, connected, pass) {
        var _iterator = _createForOfIteratorHelper(nodes), _step;
        try {
          for (_iterator.s();!(_step = _iterator.n()).done; ) {
            var node = _step.value;
            if (pass || QSA$1 in node) {
              if (connected) {
                if (!added.has(node)) {
                  added.add(node);
                  removed["delete"](node);
                  callback(node, connected);
                }
              } else if (!removed.has(node)) {
                removed.add(node);
                added["delete"](node);
                callback(node, connected);
              }
              if (!pass)
                loop(node[QSA$1](selectors), selectors, added, removed, connected, TRUE);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };
      var mo = new MO(function(records) {
        if (query2.length) {
          var selectors = query2.join(",");
          var added = new Set, removed = new Set;
          var _iterator2 = _createForOfIteratorHelper(records), _step2;
          try {
            for (_iterator2.s();!(_step2 = _iterator2.n()).done; ) {
              var _step2$value = _step2.value, addedNodes = _step2$value.addedNodes, removedNodes = _step2$value.removedNodes;
              loop(removedNodes, selectors, added, removed, FALSE, FALSE);
              loop(addedNodes, selectors, added, removed, TRUE, FALSE);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      });
      var observe = mo.observe;
      (mo.observe = function(node) {
        return observe.call(mo, node, {
          subtree: TRUE,
          childList: TRUE
        });
      })(root);
      return mo;
    };
    var QSA = "querySelectorAll";
    var _self$1 = self, document$2 = _self$1.document, Element$1 = _self$1.Element, MutationObserver$2 = _self$1.MutationObserver, Set$2 = _self$1.Set, WeakMap$1 = _self$1.WeakMap;
    var elements = function elements(element) {
      return QSA in element;
    };
    var filter = [].filter;
    var qsaObserver = function(options) {
      var live = new WeakMap$1;
      var drop = function drop(elements2) {
        for (var i = 0, length = elements2.length;i < length; i++)
          live["delete"](elements2[i]);
      };
      var flush = function flush() {
        var records = observer.takeRecords();
        for (var i = 0, length = records.length;i < length; i++) {
          parse2(filter.call(records[i].removedNodes, elements), false);
          parse2(filter.call(records[i].addedNodes, elements), true);
        }
      };
      var matches = function matches(element) {
        return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
      };
      var notifier = function notifier(element, connected) {
        var selectors;
        if (connected) {
          for (var q, m = matches(element), i = 0, length = query2.length;i < length; i++) {
            if (m.call(element, q = query2[i])) {
              if (!live.has(element))
                live.set(element, new Set$2);
              selectors = live.get(element);
              if (!selectors.has(q)) {
                selectors.add(q);
                options.handle(element, connected, q);
              }
            }
          }
        } else if (live.has(element)) {
          selectors = live.get(element);
          live["delete"](element);
          selectors.forEach(function(q2) {
            options.handle(element, connected, q2);
          });
        }
      };
      var parse2 = function parse(elements2) {
        var connected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        for (var i = 0, length = elements2.length;i < length; i++)
          notifier(elements2[i], connected);
      };
      var query2 = options.query;
      var root = options.root || document$2;
      var observer = notify(notifier, root, MutationObserver$2, query2);
      var attachShadow2 = Element$1.prototype.attachShadow;
      if (attachShadow2)
        Element$1.prototype.attachShadow = function(init) {
          var shadowRoot = attachShadow2.call(this, init);
          observer.observe(shadowRoot);
          return shadowRoot;
        };
      if (query2.length)
        parse2(root[QSA](query2));
      return {
        drop,
        flush,
        observer,
        parse: parse2
      };
    };
    var _self = self, document$1 = _self.document, Map2 = _self.Map, MutationObserver$1 = _self.MutationObserver, Object$1 = _self.Object, Set$1 = _self.Set, WeakMap2 = _self.WeakMap, Element2 = _self.Element, HTMLElement2 = _self.HTMLElement, Node = _self.Node, Error2 = _self.Error, TypeError$1 = _self.TypeError, Reflect2 = _self.Reflect;
    var { defineProperty, keys, getOwnPropertyNames, setPrototypeOf } = Object$1;
    var legacy = !self.customElements;
    var expando = function expando(element) {
      var key = keys(element);
      var value = [];
      var ignore = new Set$1;
      var length = key.length;
      for (var i = 0;i < length; i++) {
        value[i] = element[key[i]];
        try {
          delete element[key[i]];
        } catch (SafariTP) {
          ignore.add(i);
        }
      }
      return function() {
        for (var _i = 0;_i < length; _i++)
          ignore.has(_i) || (element[key[_i]] = value[_i]);
      };
    };
    if (legacy) {
      var HTMLBuiltIn = function HTMLBuiltIn() {
        var constructor = this.constructor;
        if (!classes.has(constructor))
          throw new TypeError$1("Illegal constructor");
        var is2 = classes.get(constructor);
        if (override)
          return augment(override, is2);
        var element = createElement.call(document$1, is2);
        return augment(setPrototypeOf(element, constructor.prototype), is2);
      };
      var createElement = document$1.createElement;
      var classes = new Map2;
      var defined = new Map2;
      var prototypes = new Map2;
      var registry = new Map2;
      var query = [];
      var handle = function handle(element, connected, selector) {
        var proto = prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
          var redefine = expando(element);
          override = setPrototypeOf(element, proto);
          try {
            new proto.constructor;
          } finally {
            override = null;
            redefine();
          }
        }
        var method = "".concat(connected ? "" : "dis", "connectedCallback");
        if (method in proto)
          element[method]();
      };
      var _qsaObserver = qsaObserver({
        query,
        handle
      }), parse = _qsaObserver.parse;
      var override = null;
      var whenDefined = function whenDefined(name) {
        if (!defined.has(name)) {
          var _, $ = new Promise(function($2) {
            _ = $2;
          });
          defined.set(name, {
            $,
            _
          });
        }
        return defined.get(name).$;
      };
      var augment = attributesObserver(whenDefined, MutationObserver$1);
      self.customElements = {
        define: function define(is2, Class) {
          if (registry.has(is2))
            throw new Error2('the name "'.concat(is2, '" has already been used with this registry'));
          classes.set(Class, is2);
          prototypes.set(is2, Class.prototype);
          registry.set(is2, Class);
          query.push(is2);
          whenDefined(is2).then(function() {
            parse(document$1.querySelectorAll(is2));
          });
          defined.get(is2)._(Class);
        },
        get: function get(is2) {
          return registry.get(is2);
        },
        whenDefined
      };
      defineProperty(HTMLBuiltIn.prototype = HTMLElement2.prototype, "constructor", {
        value: HTMLBuiltIn
      });
      self.HTMLElement = HTMLBuiltIn;
      document$1.createElement = function(name, options) {
        var is2 = options && options.is;
        var Class = is2 ? registry.get(is2) : registry.get(name);
        return Class ? new Class : createElement.call(document$1, name);
      };
      if (!("isConnected" in Node.prototype))
        defineProperty(Node.prototype, "isConnected", {
          configurable: true,
          get: function get() {
            return !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
          }
        });
    } else {
      legacy = !self.customElements.get("extends-br");
      if (legacy) {
        try {
          var BR = function BR() {
            return self.Reflect.construct(HTMLBRElement, [], BR);
          };
          BR.prototype = HTMLLIElement.prototype;
          var is = "extends-br";
          self.customElements.define("extends-br", BR, {
            extends: "br"
          });
          legacy = document$1.createElement("br", {
            is
          }).outerHTML.indexOf(is) < 0;
          var _self$customElements = self.customElements, get = _self$customElements.get, _whenDefined = _self$customElements.whenDefined;
          self.customElements.whenDefined = function(is2) {
            var _this = this;
            return _whenDefined.call(this, is2).then(function(Class) {
              return Class || get.call(_this, is2);
            });
          };
        } catch (o_O) {}
      }
    }
    if (legacy) {
      var _parseShadow = function _parseShadow(element) {
        var root = shadowRoots.get(element);
        _parse(root.querySelectorAll(this), element.isConnected);
      };
      var customElements2 = self.customElements;
      var _createElement = document$1.createElement;
      var { define, get: _get, upgrade } = customElements2;
      var _ref = Reflect2 || {
        construct: function construct(HTMLElement3) {
          return HTMLElement3.call(this);
        }
      }, construct = _ref.construct;
      var shadowRoots = new WeakMap2;
      var shadows = new Set$1;
      var _classes = new Map2;
      var _defined = new Map2;
      var _prototypes = new Map2;
      var _registry = new Map2;
      var shadowed = [];
      var _query = [];
      var getCE = function getCE(is2) {
        return _registry.get(is2) || _get.call(customElements2, is2);
      };
      var _handle = function _handle(element, connected, selector) {
        var proto = _prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
          var redefine = expando(element);
          _override = setPrototypeOf(element, proto);
          try {
            new proto.constructor;
          } finally {
            _override = null;
            redefine();
          }
        }
        var method = "".concat(connected ? "" : "dis", "connectedCallback");
        if (method in proto)
          element[method]();
      };
      var _qsaObserver2 = qsaObserver({
        query: _query,
        handle: _handle
      }), _parse = _qsaObserver2.parse;
      var _qsaObserver3 = qsaObserver({
        query: shadowed,
        handle: function handle(element, connected) {
          if (shadowRoots.has(element)) {
            if (connected)
              shadows.add(element);
            else
              shadows["delete"](element);
            if (_query.length)
              _parseShadow.call(_query, element);
          }
        }
      }), parseShadowed = _qsaObserver3.parse;
      var attachShadow = Element2.prototype.attachShadow;
      if (attachShadow)
        Element2.prototype.attachShadow = function(init) {
          var root = attachShadow.call(this, init);
          shadowRoots.set(this, root);
          return root;
        };
      var _whenDefined2 = function _whenDefined2(name) {
        if (!_defined.has(name)) {
          var _, $ = new Promise(function($2) {
            _ = $2;
          });
          _defined.set(name, {
            $,
            _
          });
        }
        return _defined.get(name).$;
      };
      var _augment = attributesObserver(_whenDefined2, MutationObserver$1);
      var _override = null;
      getOwnPropertyNames(self).filter(function(k) {
        return /^HTML.*Element$/.test(k);
      }).forEach(function(k) {
        var HTMLElement3 = self[k];
        function HTMLBuiltIn2() {
          var constructor = this.constructor;
          if (!_classes.has(constructor))
            throw new TypeError$1("Illegal constructor");
          var _classes$get = _classes.get(constructor), is2 = _classes$get.is, tag = _classes$get.tag;
          if (is2) {
            if (_override)
              return _augment(_override, is2);
            var element = _createElement.call(document$1, tag);
            element.setAttribute("is", is2);
            return _augment(setPrototypeOf(element, constructor.prototype), is2);
          } else
            return construct.call(this, HTMLElement3, [], constructor);
        }
        defineProperty(HTMLBuiltIn2.prototype = HTMLElement3.prototype, "constructor", {
          value: HTMLBuiltIn2
        });
        defineProperty(self, k, {
          value: HTMLBuiltIn2
        });
      });
      document$1.createElement = function(name, options) {
        var is2 = options && options.is;
        if (is2) {
          var Class = _registry.get(is2);
          if (Class && _classes.get(Class).tag === name)
            return new Class;
        }
        var element = _createElement.call(document$1, name);
        if (is2)
          element.setAttribute("is", is2);
        return element;
      };
      customElements2.get = getCE;
      customElements2.whenDefined = _whenDefined2;
      customElements2.upgrade = function(element) {
        var is2 = element.getAttribute("is");
        if (is2) {
          var _constructor = _registry.get(is2);
          if (_constructor) {
            _augment(setPrototypeOf(element, _constructor.prototype), is2);
            return;
          }
        }
        upgrade.call(customElements2, element);
      };
      customElements2.define = function(is2, Class, options) {
        if (getCE(is2))
          throw new Error2("'".concat(is2, "' has already been defined as a custom element"));
        var selector;
        var tag = options && options["extends"];
        _classes.set(Class, tag ? {
          is: is2,
          tag
        } : {
          is: "",
          tag: is2
        });
        if (tag) {
          selector = "".concat(tag, '[is="').concat(is2, '"]');
          _prototypes.set(selector, Class.prototype);
          _registry.set(is2, Class);
          _query.push(selector);
        } else {
          define.apply(customElements2, arguments);
          shadowed.push(selector = is2);
        }
        _whenDefined2(is2).then(function() {
          if (tag) {
            _parse(document$1.querySelectorAll(selector));
            shadows.forEach(_parseShadow, [selector]);
          } else
            parseShadowed(document$1.querySelectorAll(selector));
        });
        _defined.get(is2)._(Class);
      };
    }
  })();

  // src/function/resolveErrorArray.mjs
  var resolveErrorArray = (unknown) => {
    if (unknown instanceof Error) {
      return [undefined, unknown];
    }
    let message;
    try {
      message = JSON.stringify(unknown);
    } catch {
      try {
        message = String(unknown);
      } catch {
        message = "[Unstringifiable value]";
      }
    }
    const err = new Error(message);
    return [undefined, err];
  };

  // src/function/TryAsync.mjs
  async function TryAsync(asyncFunction_) {
    try {
      const result = await asyncFunction_();
      return [result, undefined];
    } catch (error2) {
      return resolveErrorArray(error2);
    }
  }

  // src/function/RegisterBSSXTemplate.mjs
  function RegisterBSSXTemplate() {
    TryAsync(async () => {
      customElements.define("x-template", class extends HTMLDivElement {
        connectedCallback() {
          let parentTag;
          let childTag;
          let thisTag;
          const allowMultiChildElement = (this.getAttribute("child-limit") ?? "1") == "0";
          const parentAttrs = {};
          const childAttrs = {};
          const thisAttr = {};
          const attrs = this.attributes;
          for (let attr of attrs) {
            if (attr.name === "is") {
              continue;
            }
            if (attr.name.startsWith("p:")) {
              const key = attr.name.slice(2);
              if (key === "tag") {
                parentTag = attr.value;
              } else {
                parentAttrs[key] = attr.value;
              }
            } else if (attr.name.startsWith("c:")) {
              const key = attr.name.slice(2);
              if (key === "tag") {
                childTag = attr.value;
              } else {
                childAttrs[key] = attr.value;
              }
            } else if (attr.name.startsWith("s:")) {
              const key = attr.name.slice(2);
              if (key === "tag") {
                thisTag = attr.value;
              } else {
                thisAttr[key] = attr.value;
              }
            }
          }
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
            childEl = this.firstElementChild ? this.firstElementChild.cloneNode(true) : document.createTextNode(this.textContent);
          }
          let templateElement = document.createElement(thisTag || "template");
          for (const attr in thisAttr) {
            if (!Object.hasOwn(thisAttr, attr)) {
              continue;
            }
            templateElement.setAttribute(attr, thisAttr[attr]);
          }
          let innerVal;
          if (!!childEl && typeof childEl == "string") {
            innerVal = childEl;
          } else if (childEl instanceof Element && childEl.outerHTML) {
            innerVal = childEl.outerHTML;
          } else if (childEl instanceof Text) {
            innerVal = childEl.textContent;
          }
          if (innerVal) {
            templateElement.innerHTML = innerVal;
          }
          if (parentTag) {
            const parentEl = document.createElement(parentTag);
            for (const [name_, value_] of Object.entries(parentAttrs)) {
              parentEl.setAttribute(name_, value_);
            }
            parentEl.innerHTML = templateElement.outerHTML;
            templateElement = parentEl;
          }
          this.outerHTML = templateElement.outerHTML.replace(/\s+s\:/g, " ");
        }
      }, { extends: "div" });
    });
  }

  // node_modules/alpinejs/dist/module.esm.js
  var flushPending = false;
  var flushing = false;
  var queue = [];
  var lastFlushedIndex = -1;
  var transactionActive = false;
  function scheduler(callback) {
    queueJob(callback);
  }
  function startTransaction() {
    transactionActive = true;
  }
  function commitTransaction() {
    transactionActive = false;
    queueFlush();
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex)
      queue.splice(index, 1);
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      if (transactionActive)
        return;
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0;i < queue.length; i++) {
      queue[i]();
      lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
  }
  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup2 = () => {};
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set;
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === undefined)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(() => {
      let value = getter();
      JSON.stringify(value);
      if (!firstTime) {
        if (typeof value === "object" || value !== oldValue) {
          let previousValue = oldValue;
          queueMicrotask(() => {
            callback(value, previousValue);
          });
        }
      }
      oldValue = value;
      firstTime = false;
    });
    return () => release(effectReference);
  }
  async function transaction(callback) {
    startTransaction();
    try {
      await callback();
      await Promise.resolve();
    } finally {
      commitTransaction();
    }
  }
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === undefined || names.includes(name)) {
        value.forEach((i) => i());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  function cleanupElement(el) {
    el._x_effects?.forEach(dequeueJob);
    while (el._x_cleanups?.length)
      el._x_cleanups.pop()();
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var queuedMutations = [];
  function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(() => records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(() => {
      if (queuedMutations.length === queueLengthWhenTriggered) {
        while (queuedMutations.length > 0)
          queuedMutations.shift()();
      }
    });
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  var isCollecting = false;
  var deferredMutations = [];
  function deferMutations() {
    isCollecting = true;
  }
  function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
  }
  function onMutate(mutations) {
    if (isCollecting) {
      deferredMutations = deferredMutations.concat(mutations);
      return;
    }
    let addedNodes = [];
    let removedNodes = /* @__PURE__ */ new Set;
    let addedAttributes = /* @__PURE__ */ new Map;
    let removedAttributes = /* @__PURE__ */ new Map;
    for (let i = 0;i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].removedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (!node._x_marker)
            return;
          removedNodes.add(node);
        });
        mutations[i].addedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (removedNodes.has(node)) {
            removedNodes.delete(node);
            return;
          }
          if (node._x_marker)
            return;
          addedNodes.push(node);
        });
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.some((i) => i.contains(node)))
        continue;
      onElRemoveds.forEach((i) => i(node));
    }
    for (let node of addedNodes) {
      if (!node.isConnected)
        continue;
      onElAddeds.forEach((i) => i(node));
    }
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({ objects }, mergeProxyTrap);
  }
  var mergeProxyTrap = {
    ownKeys({ objects }) {
      return Array.from(new Set(objects.flatMap((i) => Object.keys(i))));
    },
    has({ objects }, name) {
      if (name == Symbol.unscopables)
        return false;
      return objects.some((obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name));
    },
    get({ objects }, name, thisProxy) {
      if (name == "toJSON")
        return collapseProxies;
      return Reflect.get(objects.find((obj) => Reflect.has(obj, name)) || {}, name, thisProxy);
    },
    set({ objects }, name, value, thisProxy) {
      const target = objects.find((obj) => Object.prototype.hasOwnProperty.call(obj, name)) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if (descriptor?.set && descriptor?.get)
        return descriptor.set.call(thisProxy, value) || true;
      return Reflect.set(target, name, value);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }
  function initInterceptors(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === undefined)
          return;
        if (typeof value === "object" && value !== null && value.__v_skip)
          return;
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {}) {
    let obj = {
      initialValue: undefined,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    let memoizedUtilities = getUtilities(el);
    Object.entries(magics).forEach(([name, callback]) => {
      Object.defineProperty(obj, `$${name}`, {
        get() {
          return callback(el, memoizedUtilities);
        },
        enumerable: false
      });
    });
    return obj;
  }
  function getUtilities(el) {
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    let utils = { interceptor, ...utilities };
    onElRemoved(el, cleanup2);
    return utils;
  }
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      handleError(e, el, expression);
    }
  }
  function handleError(...args) {
    return errorHandler(...args);
  }
  var errorHandler = normalErrorHandler;
  function setErrorHandler(handler4) {
    errorHandler = handler4;
  }
  function normalErrorHandler(error2, el, expression = undefined) {
    error2 = Object.assign(error2 ?? { message: "No error message given." }, { el, expression });
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + `"

` : ""}`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  var theRawEvaluatorFunction;
  function setRawEvaluator(newEvaluator) {
    theRawEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {}, { scope: scope2 = {}, params = [], context } = {}) => {
      if (!shouldAutoEvaluateFunctions) {
        runIfTypeOfFunction(receiver, func, mergeProxies([scope2, ...dataStack]), params);
        return;
      }
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    const safeAsyncFunction = () => {
      try {
        let func2 = new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
        Object.defineProperty(func2, "name", {
          value: `[Alpine] ${expression}`
        });
        return func2;
      } catch (error2) {
        handleError(error2, el, expression);
        return Promise.resolve();
      }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = () => {}, { scope: scope2 = {}, params = [], context } = {}) => {
      func.result = undefined;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func.call(context, func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = undefined;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = undefined);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else if (typeof value === "object" && value instanceof Promise) {
      value.then((i) => receiver(i));
    } else {
      receiver(value);
    }
  }
  function evaluateRaw(...args) {
    return theRawEvaluatorFunction(...args);
  }
  function normalRawEvaluator(el, expression, extras = {}) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let scope2 = mergeProxies([extras.scope ?? {}, ...dataStack]);
    let params = extras.params ?? [];
    if (expression.includes("await")) {
      let AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
      let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
      let func = new AsyncFunction(["scope"], `with (scope) { let __result = ${rightSideSafeExpression}; return __result }`);
      let result = func.call(extras.context, scope2);
      return result;
    } else {
      let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(()=>{ ${expression} })()` : expression;
      let func = new Function(["scope"], `with (scope) { let __result = ${rightSideSafeExpression}; return __result }`);
      let result = func.call(extras.context, scope2);
      if (typeof result === "function" && shouldAutoEvaluateFunctions) {
        return result.apply(scope2, params);
      }
      return result;
    }
  }
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
      before(directive2) {
        if (!directiveHandlers[directive2]) {
          console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
          return;
        }
        const pos = directiveOrder.indexOf(directive2);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
      }
    };
  }
  function directiveExists(name) {
    return Object.keys(directiveHandlers).includes(name);
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map;
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {};
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive2, utilities);
      handler4 = handler4.bind(handler4, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {}) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      if (name === value)
        value = "";
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
  }
  var started = false;
  function start() {
    if (started)
      warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
    setTimeout(() => {
      warnAboutMissingPlugins();
    });
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (el.parentNode instanceof ShadowRoot) {
      return findClosest(el.parentNode.host, callback);
    }
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  var initInterceptors2 = [];
  function interceptInit(callback) {
    initInterceptors2.push(callback);
  }
  var markerDispenser = 1;
  function initTree(el, walker = walk, intercept = () => {}) {
    if (findClosest(el, (i) => i._x_ignore))
      return;
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        if (el2._x_marker)
          return;
        intercept(el2, skip);
        initInterceptors2.forEach((i) => i(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        if (!el2._x_ignore)
          el2._x_marker = markerDispenser++;
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root, walker = walk) {
    walker(root, (el) => {
      cleanupElement(el);
      cleanupAttributes(el);
      delete el._x_marker;
    });
  }
  function warnAboutMissingPlugins() {
    let pluginDirectives = [
      ["ui", "dialog", ["[x-dialog], [x-popover]"]],
      ["anchor", "anchor", ["[x-anchor]"]],
      ["sort", "sort", ["[x-sort]"]]
    ];
    pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
      if (directiveExists(directive2))
        return;
      selectors.some((selector) => {
        if (document.querySelector(selector)) {
          warn(`found "${selector}", but missing ${plugin2} plugin`);
          return true;
        }
      });
    });
  }
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {}) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function once(callback, fallback = () => {}) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (expression === false)
      return;
    if (!expression || typeof expression === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      enter: (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      leave: (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1000;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1000;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1000;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationIn}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: `scale(1)`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationOut}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: `scale(1)`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {}, after = () => {}) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {}, after = () => {}) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {}, () => resolve(hide));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i?.());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {}, after = () => {}) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1000;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1000;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1000;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration" || key === "delay") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {}) {
    return (...args) => isCloning ? fallback(...args) : callback(...args);
  }
  function onlyDuringClone(callback) {
    return (...args) => isCloning && callback(...args);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i) => i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      initTree(to, (el, callback) => {
        callback(el, () => {});
      });
    });
    isCloning = false;
  }
  var isCloningLegacy = false;
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {};
    });
    callback();
    overrideEffect(cache);
  }
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (isRadio(el)) {
      if (el.attributes.value === undefined) {
        el.value = value;
      }
      if (window.fromModel) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      }
    } else if (isCheckbox(el)) {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, undefined].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value === undefined ? "" : value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, undefined, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) {
      el[propName] = value;
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function safeParseBoolean(rawValue) {
    if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
      return true;
    }
    if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
      return false;
    }
    return rawValue ? Boolean(rawValue) : null;
  }
  var booleanAttributes = /* @__PURE__ */ new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "inert",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected",
    "shadowrootclonable",
    "shadowrootdelegatesfocus",
    "shadowrootserializable"
  ]);
  function isBooleanAttr(attrName) {
    return booleanAttributes.has(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== undefined)
      return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback);
  }
  function extractProp(el, name, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== undefined)
      return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== undefined) {
      let binding = el._x_inlineBindings[name];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name, fallback);
  }
  function getAttributeBinding(el, name, fallback) {
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (attr === "")
      return true;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    return attr;
  }
  function isCheckbox(el) {
    return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
  }
  function isRadio(el) {
    return el.type === "radio" || el.localName === "ui-radio";
  }
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference = effect(() => {
      let outer = outerGet();
      let inner = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner));
        } else {}
      }
      outerHash = JSON.stringify(outerGet());
      innerHash = JSON.stringify(innerGet());
    });
    return () => {
      release(reference);
    };
  }
  function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
  }
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i) => i(alpine_default));
  }
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === undefined) {
      return stores[name];
    }
    stores[name] = value;
    initInterceptors(stores[name]);
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
  }
  function getStores() {
    return stores;
  }
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      return applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
    return () => {};
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    get transaction() {
      return transaction;
    },
    version: "3.15.8",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    setErrorHandler,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    initInterceptors,
    injectMagics,
    setEvaluator,
    setRawEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    transition,
    setStyles,
    mutateDom,
    directive,
    entangle,
    throttle,
    debounce,
    evaluate,
    evaluateRaw,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    cloneNode,
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0;i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  var EMPTY_OBJ = Object.freeze({});
  var EMPTY_ARR = Object.freeze([]);
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  var targetMap = /* @__PURE__ */ new WeakMap;
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol("iterate");
  var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }
  function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0;i < deps.length; i++) {
        deps[i].delete(effect3);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === undefined) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map);
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set);
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set;
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== undefined) {
        add2(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length;i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, undefined, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if (true) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target["__v_raw"];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : undefined;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, undefined, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = isMap(target) ? new Map(target) : new Set(target);
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", undefined, undefined, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap;
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap;
  var readonlyMap = /* @__PURE__ */ new WeakMap;
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap;
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive2(target) {
    if (target && target["__v_isReadonly"]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let getter = () => {
      let value;
      evaluate2((i) => value = i);
      return value;
    };
    let unwatch = watch(getter, callback);
    cleanup2(unwatch);
  });
  magic("store", getStores);
  magic("data", (el) => scope(el));
  magic("root", (el) => closestRoot(el));
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i) => {
      if (i._x_refs)
        refObjects.push(i._x_refs);
    });
    return refObjects;
  }
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }
  magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
    let cacheKey = `${name}${key ? `-${key}` : ""}`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
      let root = closestIdRoot(el, name);
      let id = root ? root._x_ids[name] : findAndIncrementId(name);
      return key ? `${name}-${id}-${key}` : `${name}-${id}`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }
  magic("el", (el) => el);
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val) => evaluateInnerSet(() => {}, { scope: { __placeholder: val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      let releaseEntanglement = entangle({
        get() {
          return outerGet();
        },
        set(value) {
          outerSet(value);
        }
      }, {
        get() {
          return innerGet();
        },
        set(value) {
          innerSet(value);
        }
      });
      cleanup2(releaseEntanglement);
    });
  });
  directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
    let placeInDom = (clone3, target2, modifiers2) => {
      if (modifiers2.includes("prepend")) {
        target2.parentNode.insertBefore(clone3, target2);
      } else if (modifiers2.includes("append")) {
        target2.parentNode.insertBefore(clone3, target2.nextSibling);
      } else {
        target2.appendChild(clone3);
      }
    };
    mutateDom(() => {
      placeInDom(clone2, target, modifiers);
      skipDuringClone(() => {
        initTree(clone2);
      })();
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup2(() => mutateDom(() => {
      clone2.remove();
      destroyTree(clone2);
    }));
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression}"`);
    return target;
  }
  var handler = () => {};
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression));
  }));
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = debounce(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.target === el && next(e);
      });
    if (event === "submit") {
      handler4 = wrapHandler(handler4, (next, e) => {
        if (e.target._x_pendingModelUpdates) {
          e.target._x_pendingModelUpdates.forEach((fn) => fn());
        }
        next(e);
      });
    }
    if (isKeyEvent(event) || isClickEvent(event)) {
      handler4 = wrapHandler(handler4, (next, e) => {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
        next(e);
      });
    }
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    if ([" ", "_"].includes(subject))
      return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isClickEvent(event) {
    return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive", "preserve-scroll", "blur", "change", "lazy"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
      let debounceIndex = keyModifiers.indexOf("throttle");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (isClickEvent(e.type))
          return false;
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      ctrl: "control",
      slash: "/",
      space: " ",
      spacebar: " ",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      comma: ",",
      equal: "=",
      minus: "-",
      underscore: "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
    } else if (typeof expression === "function" && typeof expression() === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
    } else {
      evaluateSet = () => {};
    }
    let getValue = () => {
      let result;
      evaluateGet((value) => result = value);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value) => {
      let result;
      evaluateGet((value2) => result = value2);
      if (isGetterSetter(result)) {
        result.set(value);
      } else {
        evaluateSet(() => {}, {
          scope: { __placeholder: value }
        });
      }
    };
    if (typeof expression === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    let hasChangeModifier = modifiers.includes("change") || modifiers.includes("lazy");
    let hasBlurModifier = modifiers.includes("blur");
    let hasEnterModifier = modifiers.includes("enter");
    let hasExplicitEventModifiers = hasChangeModifier || hasBlurModifier || hasEnterModifier;
    let removeListener;
    if (isCloning) {
      removeListener = () => {};
    } else if (hasExplicitEventModifiers) {
      let listeners = [];
      let syncValue = (e) => setValue(getInputValue(el, modifiers, e, getValue()));
      if (hasChangeModifier) {
        listeners.push(on(el, "change", modifiers, syncValue));
      }
      if (hasBlurModifier) {
        listeners.push(on(el, "blur", modifiers, syncValue));
        if (el.form) {
          let syncCallback = () => syncValue({ target: el });
          if (!el.form._x_pendingModelUpdates)
            el.form._x_pendingModelUpdates = [];
          el.form._x_pendingModelUpdates.push(syncCallback);
          cleanup2(() => el.form._x_pendingModelUpdates.splice(el.form._x_pendingModelUpdates.indexOf(syncCallback), 1));
        }
      }
      if (hasEnterModifier) {
        listeners.push(on(el, "keydown", modifiers, (e) => {
          if (e.key === "Enter")
            syncValue(e);
        }));
      }
      removeListener = () => listeners.forEach((remove) => remove());
    } else {
      let event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) ? "change" : "input";
      removeListener = on(el, event, modifiers, (e) => {
        setValue(getInputValue(el, modifiers, e, getValue()));
      });
    }
    if (modifiers.includes("fill")) {
      if ([undefined, null, ""].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
        setValue(getInputValue(el, modifiers, { target: el }, getValue()));
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e) => {
        nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
      });
      cleanup2(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value) {
        setValue(value);
      }
    };
    el._x_forceModelUpdate = (value) => {
      if (value === undefined && typeof expression === "string" && expression.match(/\./))
        value = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value));
      delete window.fromModel;
    };
    effect3(() => {
      let value = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== undefined)
        return event.detail !== null && event.detail !== undefined ? event.detail : event.target.value;
      else if (isCheckbox(el)) {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option) => {
          return option.value || option.text;
        });
      } else {
        let newValue;
        if (isRadio(el)) {
          if (event.target.checked) {
            newValue = event.target.value;
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = event.target.value;
        }
        if (modifiers.includes("number")) {
          return safeParseNumber(newValue);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(newValue);
        } else if (modifiers.includes("trim")) {
          return newValue.trim();
        } else {
          return newValue;
        }
      }
    });
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate2(expression, {}, false);
    }
    return evaluate2(expression, {}, false);
  }));
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
      return;
    }
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === undefined && typeof expression === "string" && expression.match(/\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value, result, modifiers));
    }));
    cleanup2(() => {
      el._x_undoAddedClasses && el._x_undoAddedClasses();
      el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
  };
  handler2.inline = (el, { value, modifiers, expression }) => {
    if (!value)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value] = { expression, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    if (data2 === undefined || data2 === true)
      data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(() => {
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
    });
  });
  interceptClone((from, to) => {
    if (from._x_dataStack) {
      to._x_dataStack = from._x_dataStack;
      to.setAttribute("data-has-alpine-state", true);
    }
  });
  function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning)
      return false;
    if (isCloningLegacy)
      return true;
    return el.hasAttribute("data-has-alpine-state");
  }
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : undefined);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once((value) => value ? show() : hide(), (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    });
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => mutateDom(() => {
        destroyTree(el2);
        el2.remove();
      }));
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === undefined)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => {
            if (keys.includes(value2))
              warn("Duplicate key on x-for", el);
            keys.push(value2);
          }, { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0;i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => {
            if (keys.includes(value))
              warn("Duplicate key on x-for", el);
            keys.push(value);
          }, { scope: { index: i, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0;i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0;i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0;i < removes.length; i++) {
        let key = removes[i];
        if (!(key in lookup))
          continue;
        mutateDom(() => {
          destroyTree(lookup[key]);
          lookup[key].remove();
        });
        delete lookup[key];
      }
      for (let i = 0;i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0;i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value]) => {
            reactiveScope[key2] = value;
          });
        };
        mutateDom(() => {
          lastEl.after(clone2);
          skipDuringClone(() => initTree(clone2))();
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0;i < sames.length; i++) {
        lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler3() {}
  handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler3);
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        mutateDom(() => {
          destroyTree(clone2);
          clone2.remove();
        });
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });
  directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {};
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {}, { scope: { $event: e }, params: [e] });
    });
    cleanup2(() => removeListener());
  }));
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setRawEvaluator(normalRawEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;
  var module_default = src_default;

  // node_modules/@alpinejs/intersect/dist/module.esm.js
  function src_default2(Alpine2) {
    Alpine2.directive("intersect", Alpine2.skipDuringClone((el, { value, expression, modifiers }, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
      let evaluate2 = evaluateLater2(expression);
      let options = {
        rootMargin: getRootMargin(modifiers),
        threshold: getThreshold(modifiers)
      };
      let observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === (value === "leave"))
            return;
          evaluate2();
          modifiers.includes("once") && observer2.disconnect();
        });
      }, options);
      observer2.observe(el);
      cleanup2(() => {
        observer2.disconnect();
      });
    }));
  }
  function getThreshold(modifiers) {
    if (modifiers.includes("full"))
      return 0.99;
    if (modifiers.includes("half"))
      return 0.5;
    if (!modifiers.includes("threshold"))
      return 0;
    let threshold = modifiers[modifiers.indexOf("threshold") + 1];
    if (threshold === "100")
      return 1;
    if (threshold === "0")
      return 0;
    return Number(`.${threshold}`);
  }
  function getLengthValue(rawValue) {
    let match = rawValue.match(/^(-?[0-9]+)(px|%)?$/);
    return match ? match[1] + (match[2] || "px") : undefined;
  }
  function getRootMargin(modifiers) {
    const key = "margin";
    const fallback = "0px 0px 0px 0px";
    const index = modifiers.indexOf(key);
    if (index === -1)
      return fallback;
    let values = [];
    for (let i = 1;i < 5; i++) {
      values.push(getLengthValue(modifiers[index + i] || ""));
    }
    values = values.filter((v) => v !== undefined);
    return values.length ? values.join(" ").trim() : fallback;
  }
  var module_default2 = src_default2;

  // src/function/safePushState.mjs
  var safePushState = (url) => {
    if (url instanceof URL) {
      url = url.href;
    } else {
      url = url;
    }
    const currentHref = window.location.href;
    if (url === currentHref) {
      return;
    }
    history.pushState(null, "", url);
  };

  // src/class/Console.mjs
  class Console {
    static #ansi = {
      reset: "\x1B[0m",
      bold: "\x1B[1m",
      colors: {
        log: "\x1B[32m",
        info: "\x1B[34m",
        warn: "\x1B[33m",
        error: "\x1B[31m"
      }
    };
    static #call = (prefix2, mode, data2) => {
      const fn = console[mode];
      if (typeof fn !== "function")
        return;
      const color = Console.#ansi.colors[mode] || "";
      const styledPrefix = `${color}${Console.#ansi.bold}${prefix2} ${mode.toUpperCase()}:${Console.#ansi.reset}`;
      fn(styledPrefix, data2);
    };
    static log = (data2) => {
      return Console.#call("\uD83D\uDFE2", "log", data2);
    };
    static info = (data2) => {
      return Console.#call("\uD83D\uDD35", "info", data2);
    };
    static warn = (data2) => {
      return Console.#call("\uD83D\uDFE0", "warn", data2);
    };
    static error = (data2) => {
      return Console.#call("\uD83D\uDD34", "error", data2);
    };
  }

  // src/class/QChannel.mjs
  class QChannel {
    constructor(name) {
      this.name = name;
      this.open();
    }
    static #uniquePromiser = new Map;
    static #uniqueCB = async (id, instance) => {
      const existing = QChannel.#uniquePromiser.get(id);
      const { promise, resolve } = Promise.withResolvers();
      const context = {};
      if (existing === undefined) {
        QChannel.#uniquePromiser.set(id, [promise, context]);
        await Promise.resolve();
      } else {
        const [prevPromise] = existing;
        await prevPromise;
        QChannel.#uniquePromiser.set(id, [promise, context]);
      }
      const resume = () => {
        resolve();
        QChannel.#uniquePromiser.delete(id);
      };
      return {
        resume,
        isLastOnQ: () => {
          const res = QChannel.#uniquePromiser.get(id);
          if (!res) {
            return false;
          }
          const [, lastContext] = res;
          return instance.#shouldRun && lastContext === context;
        }
      };
    };
    static #qfifo = new QChannel("BSX main qfifo");
    static fifo = {
      key: async () => {
        return await QChannel.#qfifo.key(QChannel.#qfifo);
      },
      callback: async (asyncCallback) => {
        return await TryAsync(async () => {
          const { resume } = await this.fifo.key();
          const result = await asyncCallback();
          resume();
          return result;
        });
      }
    };
    #mapped = new Map;
    #shouldRun_ = true;
    get #shouldRun() {
      const shoulRun = this.#shouldRun_;
      if (shoulRun === false) {
        Console.warn({ qChannel_name: this.name, message: "is closed" });
      }
      return shoulRun;
    }
    close = () => {
      this.#shouldRun_ = false;
      Console.info({ qChannel_name: this.name, message: "closed" });
    };
    open = () => {
      this.#shouldRun_ = true;
      Console.info({ qChannel_name: this.name, message: "opened" });
    };
    key = async (keyID) => {
      const { resume } = await QChannel.#uniqueCB(this, this);
      const mapped = this.#mapped;
      if (mapped.has(keyID) === false) {
        mapped.set(keyID, {});
      }
      resume();
      return await QChannel.#uniqueCB(mapped.get(keyID), this);
    };
    async callback(keyID, asyncCallback) {
      let resume_;
      const res = await TryAsync(async () => {
        const { resume, isLastOnQ } = await this.key(keyID);
        resume_ = resume;
        const result = await asyncCallback({ isLastOnQ });
        return result;
      });
      resume_?.();
      return res;
    }
  }

  // src/class/BSXAnchor.mjs
  class BSXAnchor {
    static navigate = (href, push = true) => {
      if (!href) {
        Console.error("trying to navigate to blank path");
        return;
      }
      document.startViewTransition(async () => {
        await BSXAnchor.#q.callback("bsx-routing", async ({ isLastOnQ }) => {
          if (!isLastOnQ()) {
            return;
          }
          const [, error2] = await TryAsync(async () => {
            await BSXAnchor.#navigate_(href, push);
          });
          if (!error2) {
            return;
          }
          document.body.innerHTML = '<div class="container d-flex vh-100 flex-column justify-content-center align-items-center"><div class="text-center"><h1 class="display-4 text-danger">Error</h1><p class="lead"> Client-Side-Routing script somehow failed.<br /> Please return to </p><a class="btn btn-primary rounded-4" role="button" href="/">Home</a></div></div>';
        });
      });
    };
    static #q = new QChannel("BSX client side routing");
    static #generateHead = (doc = document) => {
      const map = new Map;
      BSXAnchor.#normalize(doc);
      const headChildren = doc.head.children;
      for (let i = 0;i < headChildren.length; i++) {
        const headChild = headChildren[i];
        if (!headChild) {
          continue;
        }
        map.set(headChild.outerHTML.trim().replace(/\s+/g, " "), headChild);
      }
      return map;
    };
    static #reconcileAttributes = (newElement_, currentElement_) => {
      for (const attr of Array.from(currentElement_.attributes)) {
        if (newElement_.hasAttribute(attr.name)) {
          continue;
        }
        currentElement_.removeAttribute(attr.name);
      }
      for (const attr of Array.from(newElement_.attributes)) {
        if (currentElement_.getAttribute(attr.name) ?? attr.value === "") {
          continue;
        }
        currentElement_.setAttribute(attr.name, attr.value);
      }
    };
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
      const scripts = doc.querySelectorAll("script");
      for (let i = 0;i < scripts.length; i++) {
        const script = scripts[i];
        if (!script) {
          continue;
        }
        script.setAttribute("defer", "");
        doc.head.append(script);
      }
    };
    static #navigate_ = async (href, push) => {
      const res = await fetch(href);
      const text = await res.text();
      const parser = new DOMParser;
      const newDoc = parser.parseFromString(text, "text/html");
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
      window.addEventListener("popstate", (ev) => {
        ev.preventDefault();
        BSXAnchor.navigate(location.href, false);
      });
    }
  }

  // src/function/ParseQueryParamFromExpression.mjs
  var isStringContainsQueryParams = (string) => {
    return /\?[\w\d]*/g.test(string);
  };
  function ParseQueryParamFromExpression(expression) {
    const url = new URL(window.location.href);
    return expression.replace(/\?([a-zA-Z0-9_-]+)(='[^']*')?/g, (_match, paramName, defaultPart) => {
      const currentValue = url.searchParams.get(paramName);
      const defaultValue = defaultPart ? defaultPart.slice(2, -1) : "";
      const finalValue = currentValue ?? defaultValue;
      return `'${finalValue ? finalValue : defaultValue}'`;
    });
  }

  // src/plugins/A.mjs
  function A(Alpine2) {
    Alpine2.directive("a", (xAnchorElement) => {
      if (!(xAnchorElement instanceof HTMLAnchorElement)) {
        Console.error("alpine x-a can only be put on HTMLAnchorElement");
        return;
      }
      xAnchorElement.onclick = (ev) => {
        ev.preventDefault();
        BSXAnchor.navigate(ParseQueryParamFromExpression(xAnchorElement.href), true);
      };
    });
  }

  // src/function/TrySync.mjs
  function TrySync(function_) {
    try {
      const result = function_();
      return [result, undefined];
    } catch (error2) {
      return resolveErrorArray(error2);
    }
  }

  // src/function/getBsxResponsesVariantCallback.mjs
  var getBsxResponsesVariantCallback = (responsesDescriptionElement, variant) => {
    return responsesDescriptionElement[`${bsxResName}${variant}`];
  };

  // src/function/forResponses.mjs
  var truthy = "true";
  var falsy = "false";
  var truthyResponsesNames = [truthy, `x-${truthy}`];
  var falsyResponsesNames = [falsy, `x-${falsy}`];
  var bsxResName = "bsxRes";
  var callForTruthyResponsesNames = (element) => {
    for (let i = 0;i < truthyResponsesNames.length; i++) {
      const val = truthyResponsesNames[i];
      if (!val) {
        continue;
      }
      getBsxResponsesVariantCallback(element, val)?.();
    }
  };

  // src/function/callForFalsyResponsesNames.mjs
  var callForFalsyResponsesNames = (element) => {
    for (let i = 0;i < falsyResponsesNames.length; i++) {
      const val = falsyResponsesNames[i];
      if (!val) {
        continue;
      }
      getBsxResponsesVariantCallback(element, val)?.();
    }
  };

  // src/function/getWindowObject.mjs
  var getWindowObject = (expression) => {
    if (/^\d+$/.test(expression)) {
      return Number(expression);
    }
    return expression.split(".").reduce((acc, key) => acc?.[key], window);
  };

  // src/function/parseStringComma.mjs
  var parseStringComma = (argsString) => {
    const args = [];
    let current = "";
    let inQuote = false;
    let quoteChar = null;
    let escapeNext = false;
    for (const ch of argsString) {
      if (escapeNext) {
        current += "\\" + ch;
        escapeNext = false;
        continue;
      }
      if (ch === "\\") {
        escapeNext = true;
        continue;
      }
      if (inQuote) {
        if (ch === quoteChar) {
          inQuote = false;
          current += ch;
        } else {
          current += ch;
        }
      } else {
        if (ch === '"' || ch === "'") {
          inQuote = true;
          quoteChar = ch;
          current += ch;
        } else if (ch === ",") {
          if (current.trim())
            args.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
    }
    if (current.trim())
      args.push(current.trim());
    return args.map((s) => {
      if (/^['"].*['"]$/.test(s)) {
        return s.slice(1, -1);
      }
      return getWindowObject(s);
    });
  };

  // src/function/GetGlobalFnCaller.mjs
  function GetGlobalFnCaller(requestInit, globalObjectHandler, element, formData = undefined) {
    return TrySync(() => {
      let jsonRequest = {};
      if (formData) {
        jsonRequest = Object.fromEntries(formData.entries());
      }
      const fnCallMatch = globalObjectHandler.match(/^([\w$.]+)\((.*)\)$/);
      if (!fnCallMatch) {
        return () => getWindowObject(globalObjectHandler).call({
          request: { init: requestInit, body: jsonRequest },
          element
        });
      }
      const [, path, argsString] = fnCallMatch;
      if (!argsString || !path) {
        return;
      }
      const args = parseStringComma(argsString);
      const function_ = getWindowObject(path);
      if (typeof function_ !== "function") {
        throw new Error(`No valid function at ${path}`);
      }
      return () => function_.call({
        request: { init: requestInit, body: jsonRequest },
        element
      }, ...args);
    });
  }

  // src/function/isAlpineExpressionFunctionCalls.mjs
  var isAlpineExpressionFunctionCalls = (alpineExpression) => {
    return /(\([\s\S]*\))/g.test(alpineExpression);
  };

  // src/function/stripComments.mjs
  var stripComments = (text) => {
    let cleaned = text.replace(/\/\*[\s\S]*?\*\//g, "");
    cleaned = cleaned.replace(/\/\/.*$/gm, "");
    return cleaned.trim();
  };

  // src/function/Timeout.mjs
  function Timeout(timeMS) {
    const { promise, resolve } = Promise.withResolvers();
    setTimeout(resolve, timeMS);
    return promise;
  }

  // src/plugins/Listen.mjs
  var bsxRefresh = "bsxRefresh";
  var bsxLoading = "bsx-loading";
  var qChannelListen = new QChannel("BSX x-listen directive");
  function Listen(Alpine2) {
    Alpine2.directive("listen", (xListenElement, { expression, modifiers, value: debounceMS = 0, original: originalAttribute }, { cleanup: cleanup2 }) => {
      const listener = modifiers[0];
      if (!modifiers || modifiers.length !== 1 || !listener) {
        Console.error({
          "x-listen element": xListenElement,
          "all following condition must be true": {
            "modifiers exist": !!modifiers,
            "modifiers must have one modifier": modifiers.length === 1,
            "listener value is truthy": !!listener
          }
        });
        return;
      }
      addElementToMappedGetter(listener, xListenElement);
      cleanup2(() => {
        removeElementFromMappedGetter(listener, xListenElement);
      });
      if (!xListenElement[bsxRefresh]) {
        xListenElement[bsxRefresh] = async () => {
          await qChannelListen.callback(xListenElement, async ({ isLastOnQ }) => {
            if (!isLastOnQ()) {
              return;
            }
            expression = xListenElement.getAttribute(originalAttribute) ?? "";
            if (!expression) {
              return;
            }
            xListenElement.setAttribute(bsxLoading, "");
            if (isStringContainsQueryParams(expression)) {
              expression = ParseQueryParamFromExpression(expression);
            }
            let awaitForDebouncer;
            if (debounceMS) {
              awaitForDebouncer = Timeout(Number(debounceMS).valueOf());
            }
            const [newData, errorGettingXData] = await TryAsync(async () => {
              const requestInit = {
                credentials: "include",
                method: "GET",
                headers: {
                  "BSX-REQUEST": "true",
                  "BSX-LISTENER": listener,
                  "BSX-DISPATCHER": "false"
                }
              };
              const usesFunctionHandler = isAlpineExpressionFunctionCalls(expression);
              if (!usesFunctionHandler) {
                const res = await fetch(expression, requestInit);
                const raw2 = await res.text();
                const cleaned = stripComments(raw2);
                return JSON.parse(cleaned);
              }
              const [globalObjectHandler, errorGettingGlobalHandler] = GetGlobalFnCaller(requestInit, expression, xListenElement);
              if (errorGettingGlobalHandler) {
                throw errorGettingGlobalHandler;
              }
              if (typeof globalObjectHandler !== "function") {
                throw {
                  error: errorGettingGlobalHandler,
                  globalObjectHandler: expression,
                  message: "no valid globalObjectHandler detected"
                };
              }
              return await globalObjectHandler();
            });
            if (errorGettingXData) {
              Console.error({ errorGettingXData });
              callForFalsyResponsesNames(xListenElement);
              xListenElement.removeAttribute(bsxLoading);
              return;
            }
            Object.assign(Alpine2.$data(xListenElement), newData);
            callForTruthyResponsesNames(xListenElement);
            if (awaitForDebouncer) {
              await awaitForDebouncer;
            }
            Alpine2.nextTick(() => {
              xListenElement.removeAttribute(bsxLoading);
            });
          });
        };
      }
      xListenElement[bsxRefresh]();
    });
  }

  // src/class/BSXSetter.mjs
  var mappedElement = new Map;
  var addElementToMappedGetter = (name, element) => {
    const check = mappedElement.has(name);
    if (!check) {
      mappedElement.set(name, new Set);
    }
    mappedElement.get(name)?.add(element);
  };
  var removeElementFromMappedGetter = (name, element) => {
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
  var q = new QChannel("BSXSetter Q");
  var getterJobs = new Set;
  var runJob = () => {
    q.callback("BSXSetter dispatch Queue", async ({ isLastOnQ }) => {
      if (!isLastOnQ()) {
        return;
      }
      const jobs = [];
      while (getterJobs.size) {
        const [job] = getterJobs;
        if (!job) {
          continue;
        }
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
            jobs.push(element[bsxRefresh]());
          }
        });
      }
      await Promise.all(jobs);
    });
  };

  class BSXSetter {
    static dispatch = (...jobNames) => {
      if (!jobNames.length) {
        return;
      }
      for (let i = 0;i < jobNames.length; i++) {
        const jobName = jobNames[i];
        if (!jobName) {
          continue;
        }
        getterJobs.add(jobName);
      }
      runJob();
    };
  }

  // src/plugins/Dispatch.mjs
  var queueChannelForm = new QChannel("BSX x-dispatch submition Q");
  function Dispatch(Alpine2) {
    Alpine2.directive("dispatch", (xDispatchElement, { modifiers, original: originalAttribute, value: debounceMS = 0 }) => {
      if (!(xDispatchElement instanceof HTMLFormElement)) {
        Console.error("alpine x-dispatch can only be put on HTMLFormElement");
        return;
      }
      const inputElements = xDispatchElement.querySelectorAll("input");
      xDispatchElement.onsubmit = (ev) => {
        ev.preventDefault();
        queueChannelForm.callback(xDispatchElement, async ({ isLastOnQ }) => {
          if (!isLastOnQ()) {
            return;
          }
          const formData = new FormData(xDispatchElement);
          for (let i = 0;i < inputElements.length; i++) {
            const inputElement_ = inputElements[i];
            if (!inputElement_) {
              continue;
            }
            inputElement_.setAttribute("disabled", "");
          }
          let expression = xDispatchElement.getAttribute(originalAttribute) ?? "";
          if (!expression) {
            return;
          }
          if (isStringContainsQueryParams(expression)) {
            expression = ParseQueryParamFromExpression(expression);
          }
          let awaitForDebouncer;
          if (debounceMS) {
            awaitForDebouncer = Timeout(Number(debounceMS).valueOf());
          }
          const requestInit = {
            credentials: "include",
            method: "POST",
            headers: {
              "BSX-REQUEST": "true",
              "BSX-LISTENER": "false",
              "BSX-DISPATCHER": modifiers.join(";")
            },
            body: formData
          };
          const usesFunctionHandler = isAlpineExpressionFunctionCalls(expression);
          const [res, errorDispatcherResponses] = await TryAsync(async () => {
            if (!usesFunctionHandler) {
              const res3 = await fetch(expression, requestInit);
              return res3.ok;
            }
            const [handlerRef, errorGettingHandlerReference] = GetGlobalFnCaller(requestInit, expression, xDispatchElement, formData);
            if (errorGettingHandlerReference) {
              throw errorGettingHandlerReference;
            }
            if (typeof handlerRef !== "function") {
              throw {
                handlerRef,
                message: "`handlerRef` should be valid global function/function call"
              };
            }
            const [res2, errorRunningHandler] = await TryAsync(async () => {
              return await handlerRef();
            });
            if (errorRunningHandler) {
              throw errorRunningHandler;
            }
            if (res2 !== true) {
              throw {
                message: "dispatcher expects handler to return `true`"
              };
            }
            return res2;
          });
          if (errorDispatcherResponses) {
            Console.error({ errorDispatcherResponses });
            callForFalsyResponsesNames(xDispatchElement);
            return;
          }
          if (res !== true) {
            Console.error({
              message: "dispatcher expects handler to return `true`"
            });
            callForFalsyResponsesNames(xDispatchElement);
            return;
          }
          BSXSetter.dispatch(...modifiers);
          callForTruthyResponsesNames(xDispatchElement);
          if (!awaitForDebouncer) {
            return;
          }
          await awaitForDebouncer;
        });
      };
    });
  }

  // src/plugins/Clear.mjs
  function Clear(Alpine2) {
    Alpine2.directive("clear", (formElement, { modifiers: namesToClear }, { cleanup: cleanup2 }) => {
      if (!(formElement instanceof HTMLFormElement)) {
        Console.error("alpine x-clear, can only be put on HTMLFormElement");
        return;
      }
      const namesToClear_ = new Set(namesToClear);
      const inputElements = formElement.querySelectorAll("input");
      const listener = (ev) => {
        ev.preventDefault();
        queueChannelForm.callback(formElement, async () => {
          for (let i = 0;i < inputElements.length; i++) {
            const inputElement_ = inputElements[i];
            if (!inputElement_) {
              continue;
            }
            if (namesToClear_.has(inputElement_.getAttribute("name") ?? "")) {
              inputElement_.value = "";
            }
            inputElement_.removeAttribute("disabled");
            if (!inputElement_.hasAttribute("focus")) {
              continue;
            }
            inputElement_.focus();
          }
        });
      };
      formElement.addEventListener("submit", listener);
      cleanup2(() => {
        formElement.removeEventListener("submit", listener);
      });
    });
  }

  // src/function/setBsxResponsesVariantCallback.mjs
  var setBsxResponsesVariantCallback = (responsesDescriptionElement, variant, callback) => {
    responsesDescriptionElement[`${bsxResName}${variant}`] = callback;
  };

  // src/plugins/Onresponse.mjs
  function Onresponse(Alpine2) {
    Alpine2.directive("onresponse", (responseDetectionElement, { modifiers, original: originalAttribute }, { evaluate: evaluate2 }) => {
      let expectedResponse = modifiers[0];
      if (!expectedResponse) {
        expectedResponse = "true";
      }
      switch (expectedResponse) {
        case "true":
        case "false":
          setBsxResponsesVariantCallback(responseDetectionElement, `x-${expectedResponse}`, () => {
            TryAsync(async () => {
              const alpineExpression = responseDetectionElement.getAttribute(originalAttribute) ?? "";
              if (!alpineExpression) {
                throw {
                  originalAttribute,
                  alpineExpression,
                  message: "x-onresponse expression must be truthy"
                };
              }
              await evaluate2(alpineExpression);
            }).then(([, errorEvaluatingXToast]) => {
              if (!errorEvaluatingXToast) {
                return;
              }
              Console.error({ errorEvaluatingXToast });
            });
          });
          return;
      }
      Console.error({
        originalAttribute,
        "modifiers[0]": modifiers[0],
        message: "x-onresponse modifiers[0], only allowed to be string 'true' or 'false'"
      });
    });
  }

  // src/class/BSXParam.mjs
  class BSXParam {
    static set = (object, ...dipatchJobNames) => {
      const url = new URL(window.location.href);
      for (const key in object) {
        if (!Object.hasOwn(object, key)) {
          continue;
        }
        const value = object[key] ?? "";
        url.searchParams.set(key, value);
      }
      safePushState(url);
      BSXSetter.dispatch(...dipatchJobNames);
    };
  }

  // src/plugins/Param.mjs
  var qChannelPing = new QChannel("BSX x-param directive");
  function Param(Alpine2) {
    Alpine2.directive("param", (inputElement, { expression: onEventTrigger, modifiers, value: debounceMS = 0 }, { cleanup: cleanup2 }) => {
      if (!(inputElement instanceof HTMLInputElement)) {
        Console.error("alpine x-param can only be put on HTMLInputElement");
        return;
      }
      const listener = () => {
        qChannelPing.callback(inputElement, async ({ isLastOnQ }) => {
          if (!isLastOnQ()) {
            return;
          }
          let awaitForDebouncer;
          if (debounceMS) {
            awaitForDebouncer = Timeout(Number(debounceMS).valueOf());
          }
          BSXParam.set({ [inputElement.name]: inputElement.value });
          BSXSetter.dispatch(...modifiers);
          callForTruthyResponsesNames(inputElement);
          if (!awaitForDebouncer) {
            return;
          }
          await awaitForDebouncer;
        });
      };
      TrySync(() => {
        inputElement.addEventListener(onEventTrigger, listener);
        cleanup2(() => {
          inputElement.removeEventListener(onEventTrigger, listener);
        });
      });
    });
  }

  // src/class/BSXToast.mjs
  var bsxToastName = "bsx-toast";
  var bsxToastLastFor = "last-for";
  var bsxToastVariant = "variant";
  var toastContainer = "bsx-toast-container";

  class BSXToast extends HTMLElement {
    static #configs = {
      baseDuration: 600,
      factor: 0.5,
      orientation: "right",
      stackEasing: "ease-in-out",
      fadeEasing: "ease"
    };
    static setConfig = (config) => {
      BSXToast.#configs = { ...BSXToast.#configs, ...config };
      BSXToast.#stackAnimationMs_ = undefined;
      BSXToast.#exitAnimationMs_ = undefined;
    };
    static #stackAnimationMs_;
    static get #stackAnimationMS() {
      if (!BSXToast.#stackAnimationMs_) {
        BSXToast.#stackAnimationMs_ = BSXToast.#configs.baseDuration * BSXToast.#configs.factor;
      }
      return BSXToast.#stackAnimationMs_;
    }
    static #exitAnimationMs_;
    static get #exitAnimationMs() {
      if (!BSXToast.#exitAnimationMs_) {
        BSXToast.#exitAnimationMs_ = BSXToast.#configs.baseDuration * 0.75 * BSXToast.#configs.factor;
      }
      return BSXToast.#exitAnimationMs_;
    }
    static new = (lastFor, info, variant = "primary") => {
      let container = document.getElementById(toastContainer);
      if (!container) {
        container = document.createElement("div");
        container.id = toastContainer;
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
      }
      const temp = document.createElement(bsxToastName);
      temp.setAttribute(bsxToastLastFor, lastFor.toString());
      temp.setAttribute(bsxToastVariant, variant);
      if (info) {
        temp.setAttribute("info", info);
      }
      if (BSXToast.#configs.orientation === "left") {
        temp.classList.add("orientation-left");
      }
      container.append(temp);
    };
    connectedCallback() {
      const countDown = Number(this.getAttribute(bsxToastLastFor) ?? "1000");
      const variant = this.getAttribute(bsxToastVariant) ?? "primary";
      if (!this.innerHTML.trim()) {
        this.innerHTML = `<p class="toast-body">${this.getAttribute("info") ?? "this is a toast"}</p>`;
      }
      this.innerHTML += `<div class="toast-timer"><div class="toast-timer-bar"></div></div>`;
      const body = this.querySelector(".toast-body");
      if (body) {
        body.classList.add(`text-${variant === "light" ? "dark" : "white"}`);
      }
      const bar = this.querySelector(".toast-timer-bar");
      if (bar) {
        bar.classList.add(`bg-${variant}`);
        bar.offsetWidth;
        bar.style.transition = `width ${countDown}ms linear`;
        bar.style.width = "100%";
      }
      this.style.opacity = "0";
      this.style.transform = "translateY(20px)";
      requestAnimationFrame(() => {
        this.style.transition = `opacity ${BSXToast.#stackAnimationMS}ms ${BSXToast.#configs.fadeEasing}, ` + `transform ${BSXToast.#stackAnimationMS}ms ${BSXToast.#configs.stackEasing}`;
        this.style.opacity = "1";
        this.style.transform = "translateY(0)";
      });
      setTimeout(() => this.hideAndRemove(), countDown);
      this.addEventListener("click", () => this.hideAndRemove());
    }
    hideAndRemove() {
      const container = this.parentElement;
      if (!container) {
        return;
      }
      this.style.transition = `opacity ${BSXToast.#exitAnimationMs}ms ${BSXToast.#configs.fadeEasing}, ` + `transform ${BSXToast.#exitAnimationMs}ms ${BSXToast.#configs.fadeEasing}`;
      this.style.opacity = "0";
      if (this.classList.contains("orientation-left")) {
        this.style.transform = "translateX(-100%)";
      } else {
        this.style.transform = "translateX(100%)";
      }
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

  // src/plugins/Toast.mjs
  function Toast(Alpine2) {
    Alpine2.directive("toast", (toastDescriptionElement, { value: toastLifeTimeMS = 2500, modifiers: premodifiers, original: originalAttribute }) => {
      if (premodifiers.length < 0 || premodifiers.length >= 3) {
        Console.error({
          toastDescriptionElement,
          originalAttribute,
          message: "modifiers.length must be between 0 to 3"
        });
        return;
      }
      const modifiers = new Set(premodifiers);
      let truthyHandler;
      if (modifiers.has("false")) {
        modifiers.delete("false");
        truthyHandler = "false";
      } else {
        if (modifiers.has("true")) {
          modifiers.delete("true");
        }
        truthyHandler = "true";
      }
      const modifiers_ = [...modifiers];
      if (modifiers_.length > 1) {
        Console.error({
          toastDescriptionElement,
          originalAttribute,
          modifiers_,
          message: "invalid modifiers values",
          "allowed modifiers": ["true", "false", "any kind of bootstrap style variant"]
        });
        return;
      }
      let bootstrapVariant = [...modifiers_][0];
      if (!bootstrapVariant) {
        switch (truthyHandler) {
          case "true":
            bootstrapVariant = "info";
            break;
          case "false":
            bootstrapVariant = "warning";
            break;
        }
      }
      setBsxResponsesVariantCallback(toastDescriptionElement, truthyHandler, () => {
        const infoTextOrAlpineExpression = toastDescriptionElement.getAttribute(originalAttribute) ?? "";
        if (!infoTextOrAlpineExpression) {
          return;
        }
        BSXToast.new(new Number(toastLifeTimeMS).valueOf(), infoTextOrAlpineExpression, bootstrapVariant);
      });
    });
  }

  // src/function/exposeToWindow.mjs
  function exposeToWindow(name, object) {
    if (window[name]) {
      return;
    }
    window[name] = object;
  }

  // src/function/newCustomEvent.mjs
  var newCustomEvent = (el, name, detail = {}) => {
    el.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  };

  // src/class/BSX.mjs
  class BSX {
    static #isRuning = false;
    static alpine = module_default;
    static parseExpression = ParseQueryParamFromExpression;
    static timeout = Timeout;
    static tryasync = TryAsync;
    static trysync = TrySync;
    static anchor = BSXAnchor;
    static setter = BSXSetter;
    static param = BSXParam;
    static toast = BSXToast;
    static q = QChannel;
    static console = Console;
    static start = () => {
      if (BSX.#isRuning) {
        Console.error("BSX is already running");
        return;
      }
      BSX.#isRuning = true;
      module_default.plugin(module_default2);
      module_default.plugin(A);
      module_default.plugin(Clear);
      module_default.plugin(Dispatch);
      module_default.plugin(Listen);
      module_default.plugin(Onresponse);
      module_default.plugin(Param);
      module_default.plugin(Toast);
      exposeToWindow("Alpine", module_default);
      exposeToWindow("BSX", BSX);
      newCustomEvent(document, "bsx:init", BSX);
      module_default.start();
    };
  }

  // dev/bsxIIFE.mjs
  RegisterBSSXTemplate();
  BSX.start();
})();
