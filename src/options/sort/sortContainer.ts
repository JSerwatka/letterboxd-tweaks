import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { hideSort, SortConfigType } from "./sort";

// TODO: add config default (dev_only) + based on user options

// TODO this is only for dev, use user selected options
const SORT_CONFIG_DEFAULT: SortConfigType = {
    toHide: [
        "Film name",
        "Your interests",
        "Film length",
        "When Rated",
        "Shuffle",
        "Your Rating",
        "Film Popularity with Friends",
        "Reverse Order",
        "Your Diary Date",
        "Owner Diary Date",
        "Owner Rating"
    ]
};

if (checkIfOptionPage(getPageFromPathname(window.location.pathname), HIDE_SORT_NEGATIVE_PAGES, true)) {
    hideSort(SORT_CONFIG_DEFAULT);
}
