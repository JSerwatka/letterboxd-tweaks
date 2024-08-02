// import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
// import { AccountFilterConfigType, ContentFilterConfigType, FilmFilterConfigType, hideAccountFilters, hideContentFilters, hideFilmFilters } from "./filter";

// // TODO: add config default (dev_only) + based on user options

// // TODO this is only for dev, use user selected options
// const CONTENT_FILTER_CONFIG_DEFAULT: ContentFilterConfigType = {
//     toHide: [
//         "Hide documentaries",
//         "Hide unreleased titles"
//     ]
// };

// const ACCOUNT_FILTER_CONFIG_DEFAULT: AccountFilterConfigType = {
//     toHide: ["Fade watched movies", "Show custom posters"]
// };

// const FILM_FILTER_CONFIG_DEFAULT: FilmFilterConfigType = {
//     toHide: [
//         "Show/hide watched movies",
//         "Show/hide liked movies",
//         "Show/hide reviewed films",
//         "Show/hide rewatched films",
//         "Show/hide logged films",
//         "Show/hide rated films",
//         "Show/hide films in watchlist"
//     ]
// };

// if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideAccountFilters")) {
//     hideAccountFilters(ACCOUNT_FILTER_CONFIG_DEFAULT);
// }

// if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideFilmFilters")) {
//     hideFilmFilters(FILM_FILTER_CONFIG_DEFAULT);
// }

// if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideContentFilters")) {
//     hideContentFilters(CONTENT_FILTER_CONFIG_DEFAULT);
// }   
