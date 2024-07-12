import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { renderSearch } from "./search";

// TODO: run if user option selected

if (checkIfOptionPage(getPageFromPathname(window.location.pathname), RENDER_SEARCH_NEGATIVE_PAGES, true)) {
    renderSearch();
}
