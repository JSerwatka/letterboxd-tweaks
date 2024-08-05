// import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
// import { AdditionalOptionConfigType, ContentFilterConfigType, AccountFilterConfigType, hideAdditionalOptions, hideContentFilters, hideAccountFilters } from "@options/filter/filter";


// const CONTENT_FILTER_CONFIG_DEFAULT: ContentFilterConfigType = {
//     toHide: [
//         "Hide documentaries",
//         "Hide unreleased titles"
//     ]
// };

// const ADDITIONAL_OPTIONS_CONFIG_DEFAULT: AdditionalOptionConfigType = {
//     toHide: [
//         "Fade watched movies", 
//         "Show custom posters"
//     ]
// };

// const ACCOUNT_FILTER_CONFIG_DEFAULT: AccountFilterConfigType = {
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

// export const run = () => {
//     if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideAdditionalOptions")) {
//         hideAdditionalOptions(ADDITIONAL_OPTIONS_CONFIG_DEFAULT);
//     }
    
//     if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideAccountFilters")) {
//         hideAccountFilters(ACCOUNT_FILTER_CONFIG_DEFAULT);
//     }
    
//     if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "hideContentFilters")) {
//         hideContentFilters(CONTENT_FILTER_CONFIG_DEFAULT);
//     }   
// }

