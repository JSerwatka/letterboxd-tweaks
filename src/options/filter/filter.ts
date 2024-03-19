import { waitForElement } from "@utils/element-observers";

const ACCOUNT_FILTERS_SELECTORS = {
    "Fade watched movies": "li.js-account-filters > label.js-fade-toggle",
    "Show custom posters": "li.js-account-filters > label.js-custom-poster-toggle"
} as const;

// for every filter there are 2 subfilters
const FILM_FILTER_SELECTORS = {
    "Show/hide watched movies": "li.js-film-filter[data-category='watched']",
    "Show/hide liked movies": "li.js-film-filter[data-category='liked']",
    "Show/hide reviewed films": "li.js-film-filter[data-category='reviewed']",
    "Show/hide rewatched films": "li.js-film-filter[data-category='rewatched']",
    "Show/hide logged films": "li.js-film-filter[data-category='logged']",
    "Show/hide rated films": "li.js-film-filter[data-category='rated']",
    "Show/hide films in watchlist": "li.js-film-filter[data-category='watchlisted']"
} as const;

const CONTENT_FILTERS_SELECTORS = {
    "Hide documentaries": "li.js-film-filter[data-category='docs']",
    "Hide unreleased titles": "li.js-film-filter[data-category='unreleased']"
} as const;

// hides film filters specified in the configs above
export async function hideFilters() {
    const filterMenu = (await waitForElement(document, "ul.smenu-menu > li[class$='filters']"))?.parentElement;

    if (!filterMenu) return;

    for (const [option, selector] of Object.entries(ACCOUNT_FILTERS_SELECTORS)) {
        const element = await waitForElement(filterMenu, selector);
        if (element) {
            const parent = element.parentElement;
            parent?.remove();
        }
    }
    // remove only if both ACCOUNT_FILTERS_SELECTORS elements are removed
    const elementWithDivider = filterMenu.querySelector(".divider-line.js-account-filters");
    elementWithDivider?.classList.remove("divider-line");

    for (const [option, selector] of Object.entries(FILM_FILTER_SELECTORS)) {
        const showElement = await waitForElement(document, selector + "[data-type='show");
        const hideElement = await waitForElement(document, selector + "[data-type='hide");
        showElement?.remove();
        hideElement?.remove();
    }

    for (const [option, selector] of Object.entries(CONTENT_FILTERS_SELECTORS)) {
        const element = await waitForElement(filterMenu, selector);
        element?.remove();
    }
}
