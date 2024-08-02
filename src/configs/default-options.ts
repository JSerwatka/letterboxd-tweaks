import { AccountFilterConfigType, ContentFilterConfigType, FilmFilterConfigType } from "@options/filter/filter";
import { AccountLinksKeys, NavbarActionsConfig, NavbarLinksKeys, ProfileLinksKeys } from "@options/navbar/navbar";
import { SortConfigType } from "@options/sort/sort";

interface OptionBase {
    id: string;
    title: string;
    description: string;
    section: Section;
    checked: boolean;
    function: FunctionName;
} 

// export type Option = OptionBase & (
//     { function: FunctionName } | 
//     { function: "hideSort", config: SortConfigType } | 
//     { function: "hideAccountFilters", config: AccountFilterConfigType } |
//     { function: "hideFilmFilters", config: FilmFilterConfigType } |
//     { function: "hideContentFilters", config: ContentFilterConfigType } |
//     { function: "accountMenuActions", config: NavbarActionsConfig<AccountLinksKeys> } |
//     { function: "profileMenuActions", config: NavbarActionsConfig<ProfileLinksKeys> } |
//     { function: "navbarMenuActions", config: NavbarActionsConfig<NavbarLinksKeys> }
// );

export type Option = OptionBase & 
    {
        config?: SortConfigType | 
                 AccountFilterConfigType | 
                 FilmFilterConfigType | 
                 ContentFilterConfigType | 
                 NavbarActionsConfig<AccountLinksKeys | ProfileLinksKeys | NavbarLinksKeys>
    };

export type Section = "films" | "filter" | "lists" | "navbar" | "search" | "sort";

export type FunctionName =
    | "moveMovieDataToHeader"
    | "hideService"
    | "showFilmData"
    | "hideFilmFilters"
    | "hideAccountFilters"
    | "hideContentFilters"
    | "makeNewListPrivate"
    | "addMovieToPrivateList"
    | "accountMenuActions"
    | "profileMenuActions"
    | "navbarMenuActions"
    | "renderSearch"
    | "hideSort";


export const defaultOptions: Option[] = [
    // ----- FILMS -----
    {
        id: "5a16c928-7bba-4851-8fdc-e6f59fa4d123",
        title: "Move movie data to the top",
        description: "Shows film length and genres under title section",
        section: "films",
        function: "moveMovieDataToHeader",
        checked: true
    },
    {
        id: "c2446f09-f9ea-4369-a4f9-29a21f89cc53",
        title: "Hide 'Service' section",
        description: "Hides 'Service' filter in films lists",
        section: "films",
        function: "hideService",
        checked: false
    },
    {
        id: "a295bb8f-cc92-411c-b33e-844877a3e3ef",
        title: "Show improved film card",
        description: "Adds title, year, rating and other data to film poster",
        section: "films",
        function: "showFilmData",
        checked: true
    },
    // ----- SEARCH -----
    {
        id: "15212037-04cc-4ed4-9625-0e7a1974f6d4",
        title: "Enable improved search",
        description: "While you type in the search bar it returns list of films",
        section: "search",
        function: "renderSearch",
        checked: false
    },
    // ----- LISTS -----
    {
        id: "9362e1b5-ea40-4ec7-8319-3f90c16534a1",
        title: "New list always private",
        description: "When you create a new list, it chooses 'private' by default",
        section: "lists",
        function: "makeNewListPrivate",
        checked: false
    },
    {
        id: "3c4a347a-5f04-47d5-b073-3cefb8ee0bb2",
        title: "Add movie to list always private",
        description: "When you try to add a movie to a list, it goes to private tab by default",
        section: "lists",
        function: "addMovieToPrivateList",
        checked: false
    },
    // ----- NAVBAR -----
    {
        id: "90dea00e-be93-42df-a80f-fa149ee159a8",
        title: "Hide home",
        description: "Hide 'home' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Home"] }
    },
    {
        id: "9a9d741c-d1b5-49a3-8b30-01603275eb2b",
        title: "Rename 'films' to 'watched'",
        description: "Renames 'films' option to 'watched' in the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toRename: { Films: { renameTo: "Watched" } } }
    },
    {
        id: "7879016f-ef40-4ca0-a19d-8e157db15889",
        title: "Hide diary",
        description: "Hide 'diary' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Diary"] }
    },
    {
        id: "13debc4d-2a75-48fa-b5d5-0b6e00886fba",
        title: "Hide reviews",
        description: "Hide 'reviews' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Reviews"] }
    },
    {
        id: "e8d357cf-d986-4657-911d-e9ec65132ae2",
        title: "Hide likes",
        description: "Hide 'likes' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Likes"] }
    },
    {
        id: "096a82f6-b58f-4111-bc81-56d4d0715c94",
        title: "Hide tags",
        description: "Hide 'tags' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Tags"] }
    },
    {
        id: "6bbc2a8f-e96a-44d7-bcb2-6536c357317b",
        title: "Hide network",
        description: "Hide 'network' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Networks"] }
    },
    {
        id: "130e44e3-1b2a-4b89-b3bc-0da8d8f9eccd",
        title: "Hide subscriptions",
        description: "Hide 'subscriptions' option from the account menu",
        section: "navbar",
        function: "accountMenuActions",
        checked: false,
        config: { toHide: ["Subscriptions"] }
    },
    {
        id: "96771830-b6d5-4f47-ae04-1a57af6be6cf",
        title: "Hide diary",
        description: "Hide 'diary' option from the profile menu",
        section: "navbar",
        function: "profileMenuActions",
        checked: false,
        config: { toHide: ["Diary"] }
    },
    {
        id: "1806f4e4-fb2f-4697-bd46-82b25c512794",
        title: "Hide reviews",
        description: "Hide 'reviews' option from the profile menu",
        section: "navbar",
        function: "profileMenuActions",
        checked: false,
        config: { toHide: ["Reviews"] }
    },
    {
        id: "f689ec59-e295-4aa9-9028-b37a3fec0c32",
        title: "Hide likes",
        description: "Hide 'likes' option from the profile menu",
        section: "navbar",
        function: "profileMenuActions",
        checked: false,
        config: { toHide: ["Likes"] }
    },
    {
        id: "f61fa423-7525-4857-bd6d-1cac9b211761",
        title: "Hide tags",
        description: "Hide 'tags' option from the profile menu",
        section: "navbar",
        function: "profileMenuActions",
        checked: false,
        config: { toHide: ["Tags"] }
    },
    {
        id: "d8c310d0-e7fa-4d20-8473-19940cd820a7",
        title: "Hide network",
        description: "Hide 'network' option from the profile menu",
        section: "navbar",
        function: "profileMenuActions",
        checked: false,
        config: { toHide: ["Networks"] }
    },
    {
        id: "0b20cc79-86e1-4c07-b3e5-3e138571b406",
        title: "Hide invitations",
        description: "Hide 'invitations' option from the profile menu",
        section: "navbar",
        function: "profileMenuActions",
        checked: false,
        config: { toHide : ["Invitations"] }
    },
    {
        id: "48965f26-31cf-4f6a-b8c8-7993ec122116",
        title: "Redirect films to popular",
        description: "'Film' option from navbar redirects to popular this week with large cards",
        section: "navbar",
        function: "navbarMenuActions",
        checked: false,
        config: { toRedirect: { Films: { redirectTo: "size/large" } } }
    },
    {
        id: "515d2ac4-9a2e-427f-b59a-338126065e75",
        title: "Hide activity",
        description: "Hide 'activity' option from the main navbar",
        section: "navbar",
        function: "navbarMenuActions",
        checked: false,
        config: { toHide: ["Activity"] }
    },
    {
        id: "d9e2f8bf-6f78-484a-a0c5-89e6f26d0bf1",
        title: "Hide members",
        description: "Hide 'members' option from the main navbar",
        section: "navbar",
        function: "navbarMenuActions",
        checked: false,
        config: { toHide: ["Members"] }
    },
    {
        id: "8ec1f6a5-7bd8-4c7e-b5bb-a749cd0953e7",
        title: "Hide journal",
        description: "Hide 'journal' option from the main navbar",
        section: "navbar",
        function: "navbarMenuActions",
        checked: false,
        config: { toHide: ["Journal"] }
    },
    // ----- FILTER -----
    {
        id: "0f8b95e4-9982-47b6-a488-b6de6735b1f4",
        title: "Hide 'Fade watched movies' filter",
        description: "",
        section: "filter",
        function: "hideAccountFilters",
        checked: false,
        config: { toHide: ["Fade watched movies"] }
    },
    {
        id: "39ec6eb4-1384-49df-9664-6ff2d8255148",
        title: "Hide 'Show custom posters' filter",
        description: "",
        section: "filter",
        function: "hideAccountFilters",
        checked: false,
        config: { toHide: ["Show custom posters"] }
    },
    {
        id: "604ca9fb-d91e-4651-98ed-722943f0583d",
        title: "Hide 'Show/hide watched movies' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide watched movies"] }
    },
    {
        id: "0da1fb63-2ae1-4180-b1ca-72311a297156",
        title: "Hide 'Show/hide liked movies' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide liked movies"] }
    },
    {
        id: "c5e09c57-e0ec-4d8b-b680-8dcbfa8c4b00",
        title: "Hide 'Show/hide reviewed films' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide reviewed films"] } 
    },
    {
        id: "47d993eb-8de1-46aa-88e3-096902dab498",
        title: "Hide 'Show/hide rewatched films' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide rewatched films"] }  
    },
    {
        id: "30c62cfe-aec2-45cb-90bb-2a01d9a70bb7",
        title: "Hide 'Show/hide logged films' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide logged films"] }
    },
    {
        id: "d8d9fa87-e9be-47cd-adbe-caebb0c2009a",
        title: "Hide 'Show/hide rated films' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide rated films"] }
    },
    {
        id: "3e9daafe-ccab-4e72-883a-cdaf41e2232d",
        title: "Hide 'Show/hide films in watchlist' filter",
        description: "",
        section: "filter",
        function: "hideFilmFilters",
        checked: false,
        config: { toHide: ["Show/hide films in watchlist"] }
    },
    {
        id: "4a589e1f-d063-44cd-85c4-972f18f1df00",
        title: "Hide 'Hide documentaries' filter",
        description: "",
        section: "filter",
        function: "hideContentFilters",
        checked: false,
        config: { toHide: ["Hide documentaries"] }
    },
    {
        id: "86dcc4ad-f5f1-491c-8974-34fc4cb903d2",
        title: "Hide 'Hide unreleased titles' filter",
        description: "",
        section: "filter",
        function: "hideContentFilters",
        checked: false,
        config: { toHide: ["Hide unreleased titles"] }
    },
    // ----- SORT -----
    {
        id: "74b7a53f-6709-4d25-9356-76678b583887",
        title: "Hide 'Film name' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Film name"] }
    },
    {
        id: "cb12b7cb-1847-4444-9e7b-e001d1a0187f",
        title: "Hide 'Your interests' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Your interests"] }
    },
    {
        id: "934b060a-87b5-4bf5-aa81-63459dde49bc",
        title: "Hide 'Film length' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Film length"] }
    },
    {
        id: "9823250e-fe67-476f-9657-8fd40e944321",
        title: "Hide 'When Rated' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["When Rated"] }
    },
    {
        id: "9ae4387a-9bb5-4fe4-8f2c-fcb307d323e5",
        title: "Hide 'Shuffle' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Shuffle"] }
    },
    {
        id: "742370ca-b3da-43b5-ab14-694fd3fa5f31",
        title: "Hide 'Your Rating' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Your Rating"] }
    },
    {
        id: "816d24b0-a225-428f-a545-f17d821406f5",
        title: "Hide 'Film Popularity with Friends' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Film Popularity with Friends"] }
    },
    {
        id: "cbec1b07-eb1a-4257-b775-2ee98c87c902",
        title: "Hide 'Reverse Order' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Reverse Order"] }
    },
    {
        id: "4639f75e-b5cc-4a41-8d5b-1eb8290b0c8d",
        title: "Hide 'Your Diary Date' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Your Diary Date"]  }
    },
    {
        id: "08bbda63-0d9d-48ce-ae96-5c844435158f",
        title: "Hide 'Owner Diary Date' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Owner Diary Date"] }
    },
    {
        id: "97a68361-5133-4703-ba85-5b566dd6bee2",
        title: "Hide 'Owner Rating' sort",
        description: "",
        section: "sort",
        function: "hideSort",
        checked: false,
        config: { toHide: ["Owner Rating"]  }
    }
];
