import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { makeNewListPrivate, addMovieToPrivateList } from "./lists";

// TODO run given function based on selected options
if (checkIfOptionPage(getPageFromPathname(window.location.pathname), MAKE_NEW_LIST_PRIVATE_PAGES, false)) {
    makeNewListPrivate();
}
if (checkIfOptionPage(getPageFromPathname(window.location.pathname), ADD_MOVIE_TO_PRIVATE_LIST_NEGATIVE_PAGES, true)) {
    addMovieToPrivateList();
}
