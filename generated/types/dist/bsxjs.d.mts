export class BSX {
    static "__#private@#isRuning": boolean;
    static alpine: {
        readonly reactive: any;
        readonly release: any;
        readonly effect: any;
        readonly raw: any;
        readonly transaction: typeof transaction;
        version: string;
        flushAndStopDeferringMutations: typeof flushAndStopDeferringMutations;
        dontAutoEvaluateFunctions: typeof dontAutoEvaluateFunctions;
        disableEffectScheduling: typeof disableEffectScheduling;
        startObservingMutations: typeof startObservingMutations;
        stopObservingMutations: typeof stopObservingMutations;
        setReactivityEngine: typeof setReactivityEngine;
        onAttributeRemoved: typeof onAttributeRemoved;
        onAttributesAdded: typeof onAttributesAdded;
        closestDataStack: typeof closestDataStack;
        skipDuringClone: typeof skipDuringClone;
        onlyDuringClone: typeof onlyDuringClone;
        addRootSelector: typeof addRootSelector;
        addInitSelector: typeof addInitSelector;
        setErrorHandler: typeof setErrorHandler;
        interceptClone: typeof interceptClone;
        addScopeToNode: typeof addScopeToNode;
        deferMutations: typeof deferMutations;
        mapAttributes: typeof mapAttributes;
        evaluateLater: typeof evaluateLater;
        interceptInit: typeof interceptInit;
        initInterceptors: typeof initInterceptors;
        injectMagics: typeof injectMagics;
        setEvaluator: typeof setEvaluator;
        setRawEvaluator: typeof setRawEvaluator;
        mergeProxies: typeof mergeProxies;
        extractProp: typeof extractProp;
        findClosest: typeof findClosest;
        onElRemoved: typeof onElRemoved;
        closestRoot: typeof closestRoot;
        destroyTree: typeof destroyTree;
        interceptor: typeof interceptor;
        transition: typeof transition;
        setStyles: typeof setStyles;
        mutateDom: typeof mutateDom;
        directive: typeof directive;
        entangle: typeof entangle;
        throttle: typeof throttle;
        debounce: typeof debounce;
        evaluate: typeof evaluate;
        evaluateRaw: typeof evaluateRaw;
        initTree: typeof initTree;
        nextTick: typeof nextTick;
        prefixed: typeof prefix;
        prefix: typeof setPrefix;
        plugin: typeof plugin;
        magic: typeof magic;
        store: typeof store;
        start: typeof start;
        clone: typeof clone;
        cloneNode: typeof cloneNode;
        bound: typeof getBinding;
        $data: typeof scope;
        watch: typeof watch;
        walk: typeof walk;
        data: typeof data;
        bind: typeof bind2;
    };
    static parseExpression: typeof ParseBSXExpression;
    static timeout: typeof Timeout;
    static tryasync: typeof TryAsync;
    static trysync: typeof TrySync;
    static anchor: typeof BSXAnchor;
    static setter: typeof BSXSetter;
    static param: typeof BSXParam;
    static toast: typeof BSXToast;
    static q: typeof QChannel;
    static console: typeof Console;
    static start: () => void;
}
declare function transaction(callback: any): Promise<void>;
declare function flushAndStopDeferringMutations(): void;
declare function dontAutoEvaluateFunctions(callback: any): any;
declare function disableEffectScheduling(callback: any): void;
declare function startObservingMutations(): void;
declare function stopObservingMutations(): void;
declare function setReactivityEngine(engine: any): void;
declare function onAttributeRemoved(el: any, name: any, callback: any): void;
declare function onAttributesAdded(callback: any): void;
declare function closestDataStack(node: any): any;
declare function skipDuringClone(callback: any, fallback?: () => void): (...args: any[]) => any;
declare function onlyDuringClone(callback: any): (...args: any[]) => any;
declare function addRootSelector(selectorCallback: any): void;
declare function addInitSelector(selectorCallback: any): void;
declare function setErrorHandler(handler4: any): void;
declare function interceptClone(callback: any): void;
declare function addScopeToNode(node: any, data2: any, referenceNode: any): () => void;
declare function deferMutations(): void;
declare function mapAttributes(callback: any): void;
declare function evaluateLater(...args: any[]): (...args: any[]) => any;
declare function interceptInit(callback: any): void;
declare function initInterceptors(data2: any): void;
declare function injectMagics(obj: any, el: any): any;
declare function setEvaluator(newEvaluator: any): void;
declare function setRawEvaluator(newEvaluator: any): void;
declare function mergeProxies(objects: any): {
    objects: any;
};
declare function extractProp(el: any, name: any, fallback: any, extract?: boolean): any;
declare function findClosest(el: any, callback: any): any;
declare function onElRemoved(el: any, callback: any): void;
declare function closestRoot(el: any, includeInitSelectors?: boolean): any;
declare function destroyTree(root: any, walker?: typeof walk): void;
declare function interceptor(callback: any, mutateObj?: () => void): (initialValue: any) => {
    initialValue: undefined;
    _x_interceptor: boolean;
    initialize(data2: any, path: any, key: any): any;
};
declare function transition(el: any, setFunction: any, { during, start: start2, end }?: {}, before?: () => void, after?: () => void): void;
declare function setStyles(el: any, value: any): () => void;
declare function mutateDom(callback: any): any;
declare function directive(name: any, callback: any): {
    before(directive2: any): void;
};
declare function entangle({ get: outerGet, set: outerSet }: {
    get: any;
    set: any;
}, { get: innerGet, set: innerSet }: {
    get: any;
    set: any;
}): () => void;
declare function throttle(func: any, limit: any): () => void;
declare function debounce(func: any, wait: any): () => void;
declare function evaluate(el: any, expression: any, extras?: {}): undefined;
declare function evaluateRaw(...args: any[]): any;
declare function initTree(el: any, walker?: typeof walk, intercept?: () => void): void;
declare function nextTick(callback?: () => void): Promise<any>;
declare function prefix(subject?: string): string;
declare function setPrefix(newPrefix: any): void;
declare function plugin(callback: any): void;
declare function magic(name: any, callback: any): void;
declare function store(name: any, value: any): any;
declare function start(): void;
declare function clone(oldEl: any, newEl: any): void;
declare function cloneNode(from: any, to: any): void;
declare function getBinding(el: any, name: any, fallback: any): any;
declare function scope(node: any): {
    objects: any;
};
declare function watch(getter: any, callback: any): () => any;
declare function walk(el: any, callback: any): void;
declare function data(name: any, callback: any): void;
declare function bind2(name: any, bindings: any): () => void;
declare function ParseBSXExpression(expression: any): any;
declare function Timeout(timeMS: any): Promise<any>;
declare function TryAsync(asyncFunction_: any): Promise<any[]>;
declare function TrySync(function_: any): any[];
declare class BSXAnchor {
    static navigate: (href: any, push?: boolean) => void;
    static "__#private@#q": QChannel;
    static "__#private@#generateHead": (doc?: Document) => Map<any, any>;
    static "__#private@#reconcileAttributes": (newElement_: any, currentElement_: any) => void;
    static "__#private@#reconcileHead": (newDoc_: any, currentDoc_?: Document) => void;
    static "__#private@#normalize": (doc?: Document) => void;
    static "__#private@#navigate_": (href: any, push: any) => Promise<void>;
}
declare class BSXSetter {
    static dispatch: (...jobNames: any[]) => void;
}
declare class BSXParam {
    static set: (object: any, ...dipatchJobNames: any[]) => void;
}
declare class BSXToast extends HTMLElement {
    static "__#private@#configs": {
        baseDuration: number;
        factor: number;
        orientation: string;
        stackEasing: string;
        fadeEasing: string;
    };
    static setConfig: (config: any) => void;
    static "__#private@#stackAnimationMs_": any;
    static get "__#private@#stackAnimationMS"(): any;
    static "__#private@#exitAnimationMs_": any;
    static get "__#private@#exitAnimationMs"(): any;
    static new: (lastFor: any, info: any, variant?: string) => void;
    connectedCallback(): void;
    hideAndRemove(): void;
}
declare class QChannel {
    static "__#private@#uniquePromiser": Map<any, any>;
    static "__#private@#uniqueCB": (id: any, instance: any) => Promise<{
        resume: () => void;
        isLastOnQ: () => any;
    }>;
    static "__#private@#qfifo": QChannel;
    static fifo: {
        key: () => Promise<{
            resume: () => void;
            isLastOnQ: () => any;
        }>;
        callback: (asyncCallback: any) => Promise<any[]>;
    };
    constructor(name: any);
    name: any;
    close: () => void;
    open: () => void;
    key: (keyID: any) => Promise<{
        resume: () => void;
        isLastOnQ: () => any;
    }>;
    callback(keyID: any, asyncCallback: any): Promise<any[]>;
    #private;
}
declare class Console {
    static "__#private@#ansi": {
        reset: string;
        bold: string;
        colors: {
            log: string;
            info: string;
            warn: string;
            error: string;
        };
    };
    static "__#private@#call": (prefix2: any, mode: any, data2: any) => void;
    static log: (data2: any) => void;
    static info: (data2: any) => void;
    static warn: (data2: any) => void;
    static error: (data2: any) => void;
}
export {};
