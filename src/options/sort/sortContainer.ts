import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { hideSort } from "./sort";

// TODO use navbar/getNavbarItemByHref for selectors
// TODO: add config default (dev_only) + based on user options
const HIDE_SORT_NEGATIVE_PAGES: SupportedPages[] = [
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

if (checkIfOptionPage(HIDE_SORT_NEGATIVE_PAGES, true)) {
    hideSort();
}
