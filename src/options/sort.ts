import { waitForElement } from "@utils/element-observers";
import { findParentByChild } from "@utils/selectors";
// TODO use navbar/getNavbarItemByHref for selectors

const sortOptionsSelectors = {
    "Film name": {
        selector: 'a[href*="by/name"]',
        isNested: false
    },
    "Your interests": {
        selector: 'a[href*="by/your-interest"]',
        isNested: true
    },
    "Film length": {
        selector: 'a[href*="by/shortest"]',
        isNested: true
    },
    "When Rated": {
        selector: 'a[href*="by/rated-date/"]',
        isNested: true
    },
    Shuffle: {
        selector: 'a[href*="by/shuffle"]',
        isNested: false
    },
    "Your Rating": {
        selector: 'a[href*="by/your-rating/"]',
        isNested: true
    },
    "Film Popularity with Friends": {
        selector: 'a[href*="popular/with/friends"]',
        isNested: true
    }
} as const;

type SortOptionName = keyof typeof sortOptionsSelectors;

const sortOptionPerPage: Record<string, SortOptionName[]> = {
    all: ["Film name", "Your interests", "Film length"],
    userFilms: ["When Rated", "Shuffle"],
    watchlist: ["Shuffle", "Your Rating"],
    films: ["Film Popularity with Friends", "Your Rating"]
};

export async function hideSort() {
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
        console.log("Parent ", targetElement);

        targetElement?.remove();
    }
}
