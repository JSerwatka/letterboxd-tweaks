// :has selector is not fully supported - this is it's polyfill
export function findParentByChild(
    childElement: Element,
    parentSelector: string,
    hasChildSelector: string,
    maxTraversals = 5
): Element | undefined {
    let parent = childElement.parentElement;
    let traversalsCount = 0;

    while (parent) {
        traversalsCount += 1;

        if (parent.matches(parentSelector) && parent.querySelector(hasChildSelector)) {
            return parent;
        }
        parent = parent.parentElement;

        if (traversalsCount >= maxTraversals) {
            return;
        }
    }
}

export function getLinkByHref(
    baseElement: Element,
    parentSelector: string,
    hrefSubstrig: string
): HTMLAnchorElement | null | undefined {
    return baseElement.querySelector(`${parentSelector} a[href*="${hrefSubstrig}"]`) as
        | HTMLAnchorElement
        | null
        | undefined;
}
