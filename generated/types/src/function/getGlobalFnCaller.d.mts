export function getGlobalFnCaller(requestInit: {
    credentials: "include";
    method: "GET" | "POST";
    headers: {
        "BSX-REQUEST": `${boolean}`;
        "BSX-LISTENER": string;
        "BSX-DISPATCHER": string;
    };
}, globalObjectHandler: string, element: HTMLElement, onCleanup: (cleanupCallback: () => void) => void, formData?: FormData): [undefined, Error] | [(() => any) | undefined, undefined];
