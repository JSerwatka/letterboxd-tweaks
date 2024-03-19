import { waitForElement } from "@utils/element-observers";
import { findParentByChild } from "@utils/selectors";
import { cleanEmptyDescriptionLabels } from "./sortUtils";
import { SortOptionsSelectors } from "./sortContainer";

// hides some sort options defined above
export async function hideSort(sortOptionsSelectors: SortOptionsSelectors) {
    const sortMenu = (await waitForElement(document, "ul.smenu-menu a[href*='/by/']"))?.closest("ul.smenu-menu") as
        | HTMLElement
        | undefined
        | null;

    if (!sortMenu) return;

    for (const [option, { selector, isNested }] of Object.entries(sortOptionsSelectors)) {
        const aTagElement = (await waitForElement(sortMenu, selector)) as HTMLElement | undefined | null;
        let targetElement: Element | undefined | null;

        if (!aTagElement) {
            console.log(`Error(SORT): option "${option}" with selector ${selector} not found`);
            continue;
        }

        if (isNested) {
            targetElement = findParentByChild(aTagElement, "li", "span.smenu-sublabel");
        } else {
            targetElement = aTagElement.parentElement;
        }

        targetElement?.remove();
    }

    cleanEmptyDescriptionLabels(sortMenu);
}
