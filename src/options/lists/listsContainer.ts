import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
import { makeNewListPrivate, addMovieToPrivateList } from "./lists";

// TODO run given function based on selected options
if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "makeNewListPrivate")) {
    makeNewListPrivate();
}
if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "addMovieToPrivateList")) {
    addMovieToPrivateList();
}
