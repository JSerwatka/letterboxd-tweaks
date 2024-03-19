// Account Filters - if both of them are switched on, also remove divider-line class from element with .divider-line and .js-account-filters classes (li element)
// Fade watched movies: (li.js-account-filters > label.js-fade-toggle).parent().remove()
// Show custom posters:  (li.js-account-filters > label.js-custom-poster-toggle).parent().remove()

// Film activity filters (2 links)
// Hide watched movies: All(li.js-film-filter + data-category="watched").remove()
// Show/hide reviewed films: All(li.js-film-filter + data-category="reviewed").remove()
// Show/hide rewatched films: All(li.js-film-filter + data-category="rewatched").remove()
// Show/hide logged films: All(li.js-film-filter + data-category="logged").remove()
// Show/hide rated films: All(li.js-film-filter + data-category="rated").remove()
// show/hide films in watchlist: All(li.js-film-filter + data-category="watchlisted").remove()

// Content filters
// Hide documentaries: (li.js-film-filter + data-category="docs").remove()
// Hide unreleased titles: (li.js-film-filter + data-category="unreleased").remove()

import { waitForElement } from "@utils/element-observers";

const accountFilters = {
    "Fade watched movies": "li.js-account-filters > label.js-fade-toggle",
    "Show custom posters": "li.js-account-filters > label.js-custom-poster-toggle"
} as const;

// for every filter there are 2 subfilters
const filmFilters = {
    "Show/hide watched movies": "li.js-film-filter[data-category='watched']",
    "Show/hide liked movies": "li.js-film-filter[data-category='liked']",
    "Show/hide reviewed films": "li.js-film-filter[data-category='reviewed']",
    "Show/hide rewatched films": "li.js-film-filter[data-category='rewatched']",
    "Show/hide logged films": "li.js-film-filter[data-category='logged']",
    "Show/hide rated films": "li.js-film-filter[data-category='rated']",
    "Show/hide films in watchlist": "li.js-film-filter[data-category='watchlisted']"
} as const;

const contentFilters = {
    "Hide documentaries": "li.js-film-filter[data-category='docs']",
    "Hide unreleased titles": "li.js-film-filter[data-category='unreleased']"
} as const;

// hides film filters specified in the configs above
export async function hideFilters() {
    const filterMenu = (await waitForElement(document, "ul.smenu-menu > li[class$='filters']"))?.parentElement;

    if (!filterMenu) return;

    for (const [option, selector] of Object.entries(accountFilters)) {
        const element = await waitForElement(filterMenu, selector);
        if (element) {
            const parent = element.parentElement;
            parent?.remove();
        }
    }
    // remove only if both accountFilters elements are removed
    const elementWithDivider = filterMenu.querySelector(".divider-line.js-account-filters");
    elementWithDivider?.classList.remove("divider-line");

    for (const [option, selector] of Object.entries(filmFilters)) {
        const showElement = await waitForElement(document, selector + "[data-type='show");
        const hideElement = await waitForElement(document, selector + "[data-type='hide");
        showElement?.remove();
        hideElement?.remove();
    }

    for (const [option, selector] of Object.entries(contentFilters)) {
        const element = await waitForElement(filterMenu, selector);
        element?.remove();
    }
}
