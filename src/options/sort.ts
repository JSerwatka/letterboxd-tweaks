// all: - Film name - (li a[href*='films/by/name']).parent()
// user/watchlist - Shuffle - (li a[href*='films/by/shuffle']).parent()
// user - When Rated - (li a[href*='films/by/rated-date/']) -> smenu-label -> li
// films/watchlist - Your Rating - 'a[href*="films/by/entry-rating"]' -> smenu-label -> li
// all - Your interests - 'a[href*="films/by/your-interest"]' -> smenu-label -> li
// all - Film length -> a[href*="films/by/shortest"] -> smenu-label -> li
// films - Film Popularity with Friends a[href*="films/popular/with/friends"] -> smenu-label -> li

import { waitForElement } from "@utils/element-observers";

const sortOptionsSelectors = {
    "Film name": {
        selector: 'a[href*="films/by/name"]',
        isNested: false
    },
    "Your interests": {
        selector: 'a[href*="films/by/your-interest"]',
        isNested: true
    },
    "Film length": {
        selector: 'a[href*="films/by/shortest"]',
        isNested: true
    },
    "When Rated": {
        selector: 'a[href*="films/by/rated-date/"]',
        isNested: true
    },
    Shuffle: {
        selector: 'a[href*="films/by/shuffle"]',
        isNested: false
    },
    "Your Rating": {
        selector: 'a[href*="films/by/entry-rating"]',
        isNested: true
    },
    "Film Popularity with Friends": {
        selector: 'a[href*="films/popular/with/friends"]',
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
    const sortMenu = (await waitForElement(document, "ul.smenu-menu a[href*='films/by/']"))?.closest("ul.smenu-menu");
    console.log(sortMenu);
}
