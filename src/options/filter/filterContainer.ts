import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
import { hideFilters, FilterConfigType } from "./filter";

// TODO: add config default (dev_only) + based on user options

// TODO this is only for dev, use user selected options
const FILTER_CONFIG_DEFAULT: FilterConfigType = {
    accountFilters: {
        toHide: ["Fade watched movies", "Show custom posters"]
    },
    filmFilters: {
        toHide: [
            "Show/hide watched movies",
            "Show/hide liked movies",
            "Show/hide reviewed films",
            "Show/hide rewatched films",
            "Show/hide logged films",
            "Show/hide rated films",
            "Show/hide films in watchlist"
        ]
    },
    contentFilters: {
        toHide: ["Hide documentaries", "Hide unreleased titles"]
    }
};

if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideFilters")) {
    hideFilters(FILTER_CONFIG_DEFAULT);
}
