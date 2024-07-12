import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { hideService, showFilmData, moveMovieDataToHeader } from "./films";

// TODO run given function based on selected options

if (checkIfOptionPage(getPageFromPathname(window.location.pathname), SHOW_FILM_DATA_NEGATIVE_PAGES, true)) {
    showFilmData();
}
if (checkIfOptionPage(getPageFromPathname(window.location.pathname), HIDE_SERVICE_NEGATIVE_PAGES, true)) {
    hideService();
}

if (checkIfOptionPage(getPageFromPathname(window.location.pathname), MOVE_MOVIE_DATA_TO_HEADER_PAGES, false)) {
    moveMovieDataToHeader();
}
