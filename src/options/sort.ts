import { waitForElement } from "@utils/element-observers";
import { findParentByChild } from "@utils/selectors";

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

type SortOptionName = keyof typeof sortOptionsSelectors;

// TODO use only filters the are for a given page
const sortOptionPerPage: Record<string, SortOptionName[]> = {
    all: ["Film name", "Your interests", "Film length"],
    userFilms: ["When Rated", "Shuffle"],
    watchlist: ["Shuffle", "Your Rating"],
    films: ["Film Popularity with Friends", "Your Rating"],
    listUser: ["Your Rating", "Shuffle", "Reverse Order", "Your Diary Date"],
    listOtherUsers: ["Your Rating", "Shuffle", "Reverse Order", "Your Diary Date", "Owner Diary Date", "Owner Rating"]
};

// TODO use navbar/getNavbarItemByHref for selectors

// hides some sort options defined above
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

        targetElement?.remove();
    }

    cleanEmptyDescriptionLabels(sortMenu);
}

function cleanEmptyDescriptionLabels(sortMenu: HTMLElement) {
    const sortDescriptionLabelElements = sortMenu.querySelectorAll("span.smenu-sublabel.-uppercase");

    sortDescriptionLabelElements.forEach((labelElement) => {
        const labelParent = labelElement.parentElement;
        const parentSibling = labelParent?.nextElementSibling;

        if (parentSibling?.querySelector("span.smenu-sublabel.-uppercase") || parentSibling === null) {
            labelParent?.remove();
        }
    });
}
