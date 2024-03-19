import { hideSort } from "./sort";

export type SortOptionsSelectors = typeof sortOptionsSelectors;
export type SortOptionName = keyof SortOptionsSelectors;

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
hideSort(sortOptionsSelectors);
