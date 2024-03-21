import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { hideFilters } from "./filter";

// TODO: add config default (dev_only) + based on user options
const HIDE_FILTERS_NEGATIVE_PAGES: SupportedPages[] = [
    "membersAllPages",
    "journalPage",
    "listsAllPages",
    "diary",
    "tags",
    "followers",
    "following",
    "followersYouKnow",
    "blocked",
    "reviewers",
    "userReview",
    "activityAllPages",
    "filmSingle"
];

if (checkIfOptionPage(HIDE_FILTERS_NEGATIVE_PAGES, true)) {
    hideFilters();
}
