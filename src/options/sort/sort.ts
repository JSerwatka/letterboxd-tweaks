import { waitForElement } from "@utils/element-observers";
import { findParentByChild } from "@utils/selectors";
import { cleanEmptyDescriptionLabels } from "./sortUtils";
import { getLinkByHref } from "@utils/selectors";

export type SortOptionName = keyof typeof SORT_OPTIONS_SELECTORS;
export type SortConfigType = { toHide: SortOptionName[] };

const SORT_OPTIONS_SELECTORS = {
    "Film name": {
        selector: "by/name",
        isNested: false
    },
    "Your interests": {
        selector: "by/your-interest",
        isNested: true
    },
    "Film length": {
        selector: "by/shortest",
        isNested: true
    },
    "When Rated": {
        selector: "by/rated-date/",
        isNested: true
    },
    Shuffle: {
        selector: "by/shuffle",
        isNested: false
    },
    "Your Rating": {
        selector: "by/your-rating/",
        isNested: true
    },
    "Film Popularity with Friends": {
        selector: "popular/with/friends",
        isNested: true
    },
    "Reverse Order": {
        selector: "by/reverse",
        isNested: false
    },
    "Your Diary Date": {
        selector: "by/your-diary",
        isNested: true
    },
    "Owner Diary Date": {
        selector: "by/owner-diary",
        isNested: true
    },
    "Owner Rating": {
        selector: "by/owner-rating",
        isNested: true
    }
} as const;

// TODO v2 use only filters that are for a given page. Currently it hides all sort options, even if they are not present on the page
const SORT_OPTIONS_PER_PAGE: Record<string, SortOptionName[]> = {
    all: ["Film name", "Your interests", "Film length"],
    userFilms: ["When Rated", "Shuffle"],
    watchlist: ["Shuffle", "Your Rating"],
    films: ["Film Popularity with Friends", "Your Rating"],
    listUser: ["Your Rating", "Shuffle", "Reverse Order", "Your Diary Date"],
    listOtherUsers: ["Your Rating", "Shuffle", "Reverse Order", "Your Diary Date", "Owner Diary Date", "Owner Rating"]
};

// hides some sort options defined above
export async function hideSort(config: SortConfigType) {
    const sortMenu = (await waitForElement(document, "ul.smenu-menu a[href*='/by/']"))?.closest("ul.smenu-menu") as
        | HTMLElement
        | undefined
        | null;

    if (!sortMenu) return;

    for (const option of config.toHide) {
        const { isNested, selector } = SORT_OPTIONS_SELECTORS[option];

        const aTagElement = getLinkByHref(sortMenu, "", selector);
        let targetElement: Element | undefined | null;

        if (!aTagElement) {
            console.log(`Info(SORT): option "${option}" with selector ${selector} not found`);
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
