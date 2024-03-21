import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { hideService, showFilmData, moveMovieDataToHeader } from "./films";

const SHOW_FILM_DATA_NEGATIVE_PAGES: SupportedPages[] = [
    "membersAllPages",
    "journalPage",
    "listsAllPages",
    "diary",
    "tags",
    "followers",
    "following",
    "followersYouKnow",
    "blocked",
    "reviewers"
];

const HIDE_SERVICE_NEGATIVE_PAGES: SupportedPages[] = [
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

const MOVE_MOVIE_DATA_TO_HEADER_PAGES: SupportedPages[] = ["filmSingle"];

// TODO run given function based on selected options

if (checkIfOptionPage(SHOW_FILM_DATA_NEGATIVE_PAGES, true)) {
    showFilmData();
}
if (checkIfOptionPage(HIDE_SERVICE_NEGATIVE_PAGES, true)) {
    hideService();
}
if (checkIfOptionPage(MOVE_MOVIE_DATA_TO_HEADER_PAGES, false)) {
    moveMovieDataToHeader();
}
