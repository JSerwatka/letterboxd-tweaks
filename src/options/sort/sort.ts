import { waitForElement } from "@utils/element-observers";
import { findParentByChild } from "@utils/selectors";
import { cleanEmptyDescriptionLabels } from "./sortUtils";

export type SortOptionsSelectors = typeof SORT_OPTIONS_SELECTORS;
export type SortOptionName = keyof SortOptionsSelectors;

const SORT_OPTIONS_SELECTORS = {
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
    },
    "Reverse Order": {
        selector: 'a[href*="by/reverse"]',
        isNested: false
    },
    "Your Diary Date": {
        selector: 'a[href*="by/your-diary"]',
        isNested: true
    },
    "Owner Diary Date": {
        selector: 'a[href*="by/owner-diary"]',
        isNested: true
    },
    "Owner Rating": {
        selector: 'a[href*="by/owner-rating"]',
        isNested: true
    }
} as const;

// TODO use only filters the are for a given page
const SORT_OPTIONS_PER_PAGE: Record<string, SortOptionName[]> = {
    all: ["Film name", "Your interests", "Film length"],
    userFilms: ["When Rated", "Shuffle"],
    watchlist: ["Shuffle", "Your Rating"],
    films: ["Film Popularity with Friends", "Your Rating"],
    listUser: ["Your Rating", "Shuffle", "Reverse Order", "Your Diary Date"],
    listOtherUsers: ["Your Rating", "Shuffle", "Reverse Order", "Your Diary Date", "Owner Diary Date", "Owner Rating"]
};

// hides some sort options defined above
export async function hideSort() {
    const sortMenu = (await waitForElement(document, "ul.smenu-menu a[href*='/by/']"))?.closest("ul.smenu-menu") as
        | HTMLElement
        | undefined
        | null;

    if (!sortMenu) return;

    for (const [option, { selector, isNested }] of Object.entries(SORT_OPTIONS_SELECTORS)) {
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
