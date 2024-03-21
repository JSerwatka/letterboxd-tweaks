import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import { makeNewListPrivate, addMovieToPrivateList } from "./lists";

const MAKE_NEW_LIST_PRIVATE_PAGES: SupportedPages[] = ["listNew"];

const ADD_MOVIE_TO_PRIVATE_LIST_NEGATIVE_PAGES: SupportedPages[] = [
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

// TODO run given function based on selected options
if (checkIfOptionPage(MAKE_NEW_LIST_PRIVATE_PAGES, false)) {
    makeNewListPrivate();
}
if (checkIfOptionPage(ADD_MOVIE_TO_PRIVATE_LIST_NEGATIVE_PAGES, true)) {
    addMovieToPrivateList();
}
