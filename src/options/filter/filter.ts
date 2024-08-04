import { waitForElement } from "@utils/element-observers";
import { findParentByChild } from "@utils/selectors";

export type AdditionalOptionConfigType = { toHide: AdditionalOptionName[] };
export type AccountFilterConfigType = { toHide: AccountFilterName[] };
export type ContentFilterConfigType = { toHide: ContentFilterName[] };

export type AdditionalOptionName = keyof typeof ADDITIONAL_OPTIONS_SELECTORS;
export type AccountFilterName = keyof typeof ACCOUNT_FILTERS_SELECTORS;
export type ContentFilterName = keyof typeof CONTENT_FILTERS_SELECTORS;

const ADDITIONAL_OPTIONS_SELECTORS = {
    "Fade watched movies": "li.js-account-filters > label.js-fade-toggle",
    "Show custom posters": "li.js-account-filters > label.js-custom-poster-toggle"
} as const;

// for every filter there are 2 subfilters
const ACCOUNT_FILTERS_SELECTORS = {
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

const FILTER_MENU_SELECTOR = "ul.smenu-menu > li[class$='filters']";

export const hideAdditionalOptions = async (config: AdditionalOptionConfigType) => {
    const filterMenu = (await waitForElement(document, FILTER_MENU_SELECTOR))?.parentElement;
    
    if (!filterMenu) return;

    for (const option of config.toHide) {
        const selector = ADDITIONAL_OPTIONS_SELECTORS[option];
        const element = await waitForElement(filterMenu, selector);
        if (element) {
            const parent = element.parentElement;
            parent?.remove();
        }
    }
    // Remove divider line only if both 'Additional options' elements are removed
    if (config.toHide.length === Object.keys(ADDITIONAL_OPTIONS_SELECTORS).length) {
        const firstDividerLine = filterMenu.querySelector(".smenu-selected") as HTMLElement | null;
        if (!firstDividerLine) return;

        firstDividerLine.style.borderBottom = "none";
    }
}

export const hideAccountFilters = async (config: AccountFilterConfigType) => {
    const filterMenu = (await waitForElement(document, FILTER_MENU_SELECTOR))?.parentElement;
    let accountFilterSection: Element | null | undefined = null;

    if (!filterMenu) return;

    for (const option of config.toHide) {
        const selector = ACCOUNT_FILTERS_SELECTORS[option];
        const showElement = await waitForElement(document, selector + "[data-type='show");
        const hideElement = await waitForElement(document, selector + "[data-type='hide");

        if (!accountFilterSection) {
            accountFilterSection = showElement && findParentByChild(showElement, ".js-account-filters", "span.smenu-sublabel");
        }

        showElement?.remove();
        hideElement?.remove();
    }

    if (config.toHide.length === Object.keys(ACCOUNT_FILTERS_SELECTORS).length) {
        accountFilterSection?.remove();
    }
};


export const hideContentFilters = async (config: ContentFilterConfigType) => {
    const filterMenu = (await waitForElement(document, FILTER_MENU_SELECTOR))?.parentElement;

    if (!filterMenu) return;

    for (const option of config.toHide) {
        const selector = CONTENT_FILTERS_SELECTORS[option];
        const element = await waitForElement(filterMenu, selector);
        element?.remove();
    }
}