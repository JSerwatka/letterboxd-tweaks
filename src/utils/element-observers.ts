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
                if (node instanceof Element && node.matches(selector)) {
                    if (node.querySelector(selector)) {
                        node.querySelectorAll(selector).forEach(callback);
                    }   
                    else if (node.matches(selector)) {
                        callback(node);
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

export async function waitForElement(
    baseElement: HTMLElement | Document,
    selector: string,
    timeout = 5000
): Promise<Element | null | undefined> {
    let timeoutId: NodeJS.Timeout;

    return new Promise((resolve) => {
        if (baseElement.querySelector(selector)) {
            return resolve(baseElement.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (baseElement.querySelector(selector)) {
                timeoutId && clearTimeout(timeoutId);
                observer.disconnect();
                resolve(baseElement.querySelector(selector));
            }
        });

        observer.observe(baseElement, {
            childList: true,
            subtree: true
        });

        timeoutId = setTimeout(() => {
            observer.disconnect();
            resolve(undefined);
        }, timeout);
    });
}

export async function waitForElementData(
    baseElement: HTMLElement | Document,
    selector: string,
    dataToObserve: { dataAttribute?: string; textContent?: boolean; titleAttribute?: boolean },
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
