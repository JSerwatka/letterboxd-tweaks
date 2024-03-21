import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { renderSearch } from "./search";

// all pages
const RENDER_SEARCH_NEGATIVE_PAGES: SupportedPages[] = [];

// TODO: run if user option selected

if (checkIfOptionPage(RENDER_SEARCH_NEGATIVE_PAGES, true)) {
    renderSearch();
}
