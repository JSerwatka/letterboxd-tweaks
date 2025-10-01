export function observeElement(
    baseElement: HTMLElement | Document,
    selector: string,
    callback: (element: Element) => void,
    timeout?: number
) {
    // Run the callback for all existing elements
    baseElement.querySelectorAll(selector).forEach(callback);

    // Observe newly added elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof Element) {
                    if (node.matches(selector)) {
                        callback(node);
                    } else if (node.querySelector(selector)) {
                        node.querySelectorAll(selector).forEach(callback);
                    }
                }
            });
        });
    });

    observer.observe(baseElement, { childList: true, subtree: true });

    if (timeout) {
        setTimeout(() => {
            observer.disconnect();
        }, timeout);
    }
}

type WaitForElementOptions = {
    timeout?: number;
    /**
     * When true, the timeout will pause while the document is hidden
     * (background tab) and resume when it becomes visible again.
     */
    pauseTimeoutWhileHidden?: boolean;
};

export async function waitForElement(
    baseElement: HTMLElement | Document,
    selector: string,
    timeoutOrOptions: number | WaitForElementOptions = 5000
): Promise<Element | null | undefined> {
    const { timeout, pauseTimeoutWhileHidden } =
        typeof timeoutOrOptions === "number"
            ? { timeout: timeoutOrOptions, pauseTimeoutWhileHidden: false }
            : {
                timeout: timeoutOrOptions.timeout ?? 5000,
                pauseTimeoutWhileHidden: Boolean(timeoutOrOptions.pauseTimeoutWhileHidden)
            };

    let timeoutId: NodeJS.Timeout | undefined;
    let remainingMs = timeout;
    let lastStart = Date.now();

    return new Promise((resolve) => {
        const resolveOnce = (value: Element | null | undefined) => {
            if (timeoutId) clearTimeout(timeoutId);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            observer.disconnect();
            resolve(value);
        };

        const immediate = baseElement.querySelector(selector);
        if (immediate) {
            return resolve(immediate);
        }

        const observer = new MutationObserver(() => {
            const found = baseElement.querySelector(selector);
            if (found) {
                resolveOnce(found);
            }
        });

        observer.observe(baseElement, {
            childList: true,
            subtree: true
        });

        const startTimer = () => {
            lastStart = Date.now();
            timeoutId = setTimeout(() => {
                resolveOnce(undefined);
            }, Math.max(0, remainingMs));
        };

        const stopTimer = () => {
            if (!timeoutId) return;
            clearTimeout(timeoutId);
            timeoutId = undefined;
            const elapsed = Date.now() - lastStart;
            remainingMs = Math.max(0, remainingMs - elapsed);
        };

        const onVisibilityChange = () => {
            if (!pauseTimeoutWhileHidden) return;
            if (document.visibilityState === "hidden") {
                stopTimer();
            } else {
                // Re-check immediately on visibility gain
                const found = baseElement.querySelector(selector);
                if (found) {
                    resolveOnce(found);
                    return;
                }
                startTimer();
            }
        };

        if (pauseTimeoutWhileHidden) {
            document.addEventListener("visibilitychange", onVisibilityChange);
            if (document.visibilityState === "hidden") {
                // Don't start the timer while hidden; wait until visible
                // but still keep observing DOM mutations (in case of virtualized updates)
                // Timer will start on first visibilitychange → visible
            } else {
                startTimer();
            }
        } else {
            startTimer();
        }
    });
}

export async function waitForElementData(
    baseElement: HTMLElement | Document,
    selector: string,
    dataToObserve: { dataAttribute?: string; textContent?: boolean; titleAttribute?: boolean; },
    timeout = 3000
) {
    const { dataAttribute, textContent, titleAttribute } = dataToObserve;

    const countObservedData = [dataAttribute, textContent, titleAttribute].filter((data) => Boolean(data));
    if (countObservedData.length > 1) {
        throw new Error("only one attribute can be observed");
    }
    if (countObservedData.length < 1) {
        throw new Error("at least one attribute has to be observed");
    }

    const attributeFilter = [];
    dataAttribute && attributeFilter.push(dataAttribute);
    titleAttribute && attributeFilter.push("title");

    const observerOptions = {
        childList: true,
        subtree: true,
        characterData: Boolean(textContent),
        ...(attributeFilter.length > 0 && {
            attributes: true,
            attributeFilter: attributeFilter
        })
    };

    const getValue = () => {
        const element = baseElement.querySelector(selector) as HTMLElement;
        if (dataAttribute) {
            const dataAttributeNameParts = dataAttribute.split("-").slice(1);
            if (dataAttributeNameParts.length === 1) {
                return element?.dataset[dataAttributeNameParts[0]];
            }

            if (dataAttributeNameParts.length > 1) {
                const dataAttributeCapitalizedNameParts = dataAttributeNameParts
                    .slice(1)
                    .map((item) => item.charAt(0).toUpperCase() + item.substr(1).toLowerCase());
                const dataAttributeMapped = [dataAttributeNameParts[0], ...dataAttributeCapitalizedNameParts].join("");
                return element?.dataset[dataAttributeMapped];
            }

            throw new Error("Incorrect data attribute");
        }

        if (titleAttribute && element?.title) {
            return element?.title;
        }

        if (textContent && element?.textContent) {
            return element?.textContent;
        }
    };

    let timeoutId: NodeJS.Timeout;

    return new Promise((resolve) => {
        let value = getValue();
        if (value) {
            return resolve(value);
        }
        const observer = new MutationObserver(() => {
            let value = getValue();

            if (value) {
                timeoutId && clearTimeout(timeoutId);
                observer.disconnect();
                resolve(value);
            }
        });

        observer.observe(baseElement, observerOptions);

        timeoutId = setTimeout(() => {
            observer.disconnect();
            resolve(undefined);
        }, timeout);
    });
}
