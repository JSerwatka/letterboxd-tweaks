export type SupportedPages =
    | "membersAllPages"
    | "journalPage"
    | "listsAllPages"
    | "diary"
    | "tags"
    | "following"
    | "followers"
    | "followersYouKnow"
    | "blocked"
    | "reviewers"
    | "reviewsAllPages"
    | "userReview"
    | "activityAllPages"
    | "filmSingle"
    | "listNew";

const regexToPageArr: Array<{ page: SupportedPages; regex: RegExp }> = [
    {
        page: "membersAllPages",
        regex: new RegExp("^/members/.*$")
    },
    {
        page: "journalPage",
        regex: new RegExp("^/journal/$")
    },
    {
        page: "listsAllPages",
        regex: new RegExp(".*/lists/.*")
    },
    {
        page: "diary",
        regex: new RegExp("^/.+/films/diary/$")
    },
    {
        page: "tags",
        regex: new RegExp("^/.+/tags/$")
    },
    {
        page: "following",
        regex: new RegExp("^/.+/following/$")
    },
    {
        page: "followers",
        regex: new RegExp("^/.+/followers/$")
    },
    {
        page: "followersYouKnow",
        regex: new RegExp("^/.+/followers-you-know/$")
    },
    {
        page: "blocked",
        regex: new RegExp("^/.+/blocked/$")
    },
    {
        page: "reviewers",
        regex: new RegExp("^/reviewers/.*")
    },
    {
        page: "reviewsAllPages",
        regex: new RegExp("^.*/reviews/.*")
    },
    {
        page: "userReview",
        regex: new RegExp("^.+/film/.+")
    },
    {
        page: "activityAllPages",
        regex: new RegExp(".*/activity/.*")
    },
    {
        page: "filmSingle",
        regex: new RegExp("^/film/[^/]+/$") // FIXME: nanogenres, themes i similar mają bardzo podobną strukturę, musisz rozpoznac na prawno czy to to
    },
    {
        page: "listNew",
        regex: new RegExp("^/list/new/$")
    }
];

// https://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript
function getPageFromPathname(pathname: string): SupportedPages | undefined {
    for (const regexToPage of regexToPageArr) {
        if (regexToPage.regex.test(pathname)) {
            return regexToPage.page;
        }
    }
}

export function checkIfOptionPage(acceptedPages: SupportedPages[], negativeSearch: boolean = false): boolean {
    const page = getPageFromPathname(window.location.pathname);

    if (negativeSearch) {
        if (!page || !acceptedPages.includes(page)) return true;
        return false;
    }

    if (!page || !acceptedPages.includes(page)) return false;
    return true;
}
// search: https://letterboxd.com/search/<searchtext>/
// journalPage: https://letterboxd.com/journal/
// journalSingle: https://letterboxd.com/journal/<title>/ np. https://letterboxd.com/journal/origin-ava-duvernay-interview/
// membersPage: https://letterboxd.com/members/
// membersOverview: https://letterboxd.com/members/<type> np. https://letterboxd.com/members/popular/this/week/ or https://letterboxd.com/members/popular/with/friends/
// membersHQ: https://letterboxd.com/members/hq/
// listsPage: https://letterboxd.com/lists/
// listsOverview: https://letterboxd.com/lists/<type> np. https://letterboxd.com/lists/popular/this/week/ or https://letterboxd.com/lists/popular/with/friends/this/week/
// listsUser: https://letterboxd.com/<username>/lists/
// listsUserShared: https://letterboxd.com/<username>/lists/shared/with/you/
// listSingle: https://letterboxd.com/<username>/list/flanagans-all-time-favorites/ np. https://letterboxd.com/flanaganfilm/list/flanagans-all-time-favorites/
// listNew: https://letterboxd.com/list/new/
// activityCurrentUserFriends: https://letterboxd.com/activity/
// activityCurrentUser: https://letterboxd.com/activity/you/
// activityCurrentuserIncoming: https://letterboxd.com/activity/incoming/
// activityOtherUser: https://letterboxd.com/<username>/activity/
// activityOtherUserFollowing: https://letterboxd.com/lilfilm/activity/following/
// watched: https://letterboxd.com/<username>/films/
// diary: https://letterboxd.com/<username>/films/diary/
// tags: https://letterboxd.com/<username>/tags/
// following : https://letterboxd.com/<username>/following/
// followers:  https://letterboxd.com/<username>/followers/
// followersYouKnow: https://letterboxd.com/<username>/followers-you-know/ (only for other users)
// stats: https://letterboxd.com/<username>/stats/
// blocked:  https://letterboxd.com/<username>/blocked/
// likesFilms: https://letterboxd.com/<username>/likes/films/
// likesReviews: https://letterboxd.com/<username>/likes/reviews/
// likesLists: https://letterboxd.com/<username>/likes/lists/
// watchlist: https://letterboxd.com/<username>/watchlist/
// userPage: https://letterboxd.com/<username>/
// reviewsUser: https://letterboxd.com/<username>/films/reviews/ np. https://letterboxd.com/elvisthealien/films/reviews/
// reviews: https://letterboxd.com/reviews/<type>/ np.https://letterboxd.com/reviews/popular/this/week/ or https://letterboxd.com/reviews/popular/with/friends/
// reviewers: https://letterboxd.com/reviewers/<type> np. https://letterboxd.com/reviewers/popular/with/friends/ or https://letterboxd.com/reviewers/popular/this/all-time/
// userReview: https://letterboxd.com/<username>/film/<filmname>/ np. https://letterboxd.com/elvisthealien/film/poor-things-2023/
// filmsPage: https://letterboxd.com/films/
// filmsOverview: https://letterboxd.com/films/<type>/ np. https://letterboxd.com/films/popular/this/week/ or https://letterboxd.com/films/popular/this/week/year/1985/genre/animation/
// filmSingle: https://letterboxd.com/film/<filmname>/ np. https://letterboxd.com/film/poor-things-2023/
// filmSimilar: https://letterboxd.com/film/<filmname>/similar/ np. https://letterboxd.com/film/bridge-to-terabithia/similar/
// filmThemes: https://letterboxd.com/film/<filmname>/themes/ np. https://letterboxd.com/film/bridge-to-terabithia/themes/
// filmNanogenres: https://letterboxd.com/film/<filmname>/nanogenres/ np. https://letterboxd.com/film/bridge-to-terabithia/nanogenres/
// studioPage: https://letterboxd.com/studio/<studioname>/ np.https://letterboxd.com/studio/dune-entertainment/ or with filter

// --- Cinema People --
// directorPage: https://letterboxd.com/director/<directorname>/ np. https://letterboxd.com/director/yorgos-lanthimos/ or https://letterboxd.com/director/yorgos-lanthimos/by/rating-lowest/
// actorPage: https://letterboxd.com/actor/<actorname>/ np. https://letterboxd.com/actor/colin-farrell/ or https://letterboxd.com/actor/colin-farrell/by/release-earliest/
// assistantDirectorPage: https://letterboxd.com/assistant-director/<name>/ np. https://letterboxd.com/assistant-director/owen-magee/ or with filter
// additionalDirectorPage: https://letterboxd.com/additional-directing/<name>/ np.https://letterboxd.com/additional-directing/jeremy-hollobon/ or with filter
// producerPage: https://letterboxd.com/producer/<name>/ np. https://letterboxd.com/producer/carole-scotta/ or with filter
// executiveProducerPage: https://letterboxd.com/executive-producer/<name>/ np. https://letterboxd.com/executive-producer/tessa-ross/ or with filter
// writerPage: https://letterboxd.com/writer/<name>/ np. https://letterboxd.com/writer/yorgos-lanthimos/ or with filter
// castingPage: https://letterboxd.com/casting/<name>/ np.https://letterboxd.com/casting/jina-jay/ or with filter
// editorPage: https://letterboxd.com/editor/<name>/ np. https://letterboxd.com/editor/yorgos-mavropsaridis/ or with filter
// cinematographyPage: https://letterboxd.com/cinematography/<name>/ np. https://letterboxd.com/cinematography/thimios-bakatakis/ or with filter
// cameraOperatorPage: https://letterboxd.com/camera-operator/<name>/ np. https://letterboxd.com/camera-operator/shane-deasy/ or with filter
// additionalPhotographyPage: https://letterboxd.com/additional-photography/<name>/ np. https://letterboxd.com/additional-photography/richard-bluck/ or with filter
// lightingPage: https://letterboxd.com/lighting/<name>/ np. https://letterboxd.com/lighting/barry-conroy/ or with filter
// productionDesignPage: https://letterboxd.com/production-design/<name>/ np.https://letterboxd.com/production-design/jacqueline-abrahams/ or with filter
// artDirectionPage: https://letterboxd.com/art-direction/<name>/ np. https://letterboxd.com/art-direction/mark-kelly-5/ or with filter
// setDecorationPage: https://letterboxd.com/set-decoration/<name>/ np. https://letterboxd.com/set-decoration/kim-sinclair/ or with filter
// specialEffectsPage: https://letterboxd.com/special-effects/<name>/ np. https://letterboxd.com/special-effects/douglas-falconer/ or with filter
// visualEffectsPage: https://letterboxd.com/visual-effects/<name>/ np. https://letterboxd.com/visual-effects/pierre-buffin/ or with filter
// titleDesignpage: https://letterboxd.com/title-design/<name>/ np. https://letterboxd.com/title-design/vasilis-marmatakis/ or with filter
// stuntsPage: https://letterboxd.com/stunts/<name>/ np. https://letterboxd.com/stunts/giedrius-nagys/ or with filter
// choreographyPage: https://letterboxd.com/choreography/<name>/ np.https://letterboxd.com/choreography/lula-washington/ or with filter
// composerPage: https://letterboxd.com/composer/<name>/ np. https://letterboxd.com/composer/james-horner/ or with filter
// soundPage: https://letterboxd.com/sound/<name>/ np. https://letterboxd.com/sound/danny-van-spreuwel/ or with filter
// costumeDesignPage: https://letterboxd.com/costume-design/<name>/ np. https://letterboxd.com/costume-design/sarah-blenkinsop/ or with filter
// makupPage: https://letterboxd.com/makeup/<name>/ np. https://letterboxd.com/makeup/lucy-browne/  or with filter
// hairstylingPage: https://letterboxd.com/hairstyling/<name>/ np. https://letterboxd.com/hairstyling/eileen-buggy/  or with filter
