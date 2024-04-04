export interface Options {
    id: string;
    title: string;
    description: string;
    section: Section;
    checked: boolean;
    function?: string;
}

export type Section = "Films" | "Filter" | "Lists" | "Navbar" | "Search" | "Sort";

export const defaultOptions: Options[] = [
    // ----- NAVBAR -----
    // {
    //     id: "c28ab596-04eb-4247-b9b6-827cb85e0673",
    //     title: "Hide home",
    //     description: "Hide home option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "6808e452-0a35-4eb4-9c16-361e23d223fc",
    //     title: "Hide diary",
    //     description: "Hide diary option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "56a30745-7289-4743-ace9-9ac2f27c3a8a",
    //     title: "Hide reviews",
    //     description: "Hide reviews option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "26a16e37-3af2-48fb-a150-c970b3abd47a",
    //     title: "Hide likes",
    //     description: "Hide likes option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "93f8967e-fb6c-470e-9eab-98fcadf61fbb",
    //     title: "Hide tags",
    //     description: "Hide tags option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "a042f97e-14e4-49ea-ab8e-e7f75028d3f6",
    //     title: "Hide network",
    //     description: "Hide network option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "7f8aa1e7-4a62-4984-bd45-f8ebabbb378a",
    //     title: "Hide subscriptions",
    //     description: "Hide subscriptions option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "76bfe9a4-c15b-4150-9a8d-89f0cb670e08",
    //     title: "Hide subscriptions",
    //     description: "Hide subscriptions option from the main menu",
    //     section: "Menu",
    //     checked: false
    // },
    // {
    //     id: "1af6f649-002b-4064-a18f-87312c54270e",
    //     title: "Hide members",
    //     description: "Hide members option from the navbar",
    //     section: "Navbar",
    //     checked: false
    // },
    // {
    //     id: "c1494c7d-fd3f-4d23-b954-21152b3022c0",
    //     title: "Hide journal",
    //     description: "Hide journal option from the navbar",
    //     section: "Navbar",
    //     checked: false
    // },
    // {
    //     id: "7bc424e0-1f01-447d-8b50-8b509ce1186c",
    //     title: "Hide journal",
    //     description: "Hide journal option from the navbar",
    //     section: "Navbar",
    //     checked: false
    // },
    // ----- FILMS -----
    {
        id: "5a16c928-7bba-4851-8fdc-e6f59fa4d123",
        title: "Move movie data to the top",
        description: "Shows film length and genres under title section",
        section: "Films",
        function: "moveMovieDataToHeader",
        checked: false
    },
    {
        id: "c2446f09-f9ea-4369-a4f9-29a21f89cc53",
        title: "Hide 'Service' section",
        description: "Hides 'Service' filter in films lists",
        section: "Films",
        function: "hideService",
        checked: false
    },
    {
        id: "a295bb8f-cc92-411c-b33e-844877a3e3ef",
        title: "Show improved film card",
        description: "Adds title, year, rating and other data to film poster",
        section: "Films",
        function: "showFilmData",
        checked: false
    },
    // ----- FILTER -----
    {
        id: "0f8b95e4-9982-47b6-a488-b6de6735b1f4",
        title: "Hide 'Fade watched movies' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "39ec6eb4-1384-49df-9664-6ff2d8255148",
        title: "Hide 'Show custom posters' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "604ca9fb-d91e-4651-98ed-722943f0583d",
        title: "Hide 'Show/hide watched movies' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "0da1fb63-2ae1-4180-b1ca-72311a297156",
        title: "Hide 'Show/hide liked movies' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "c5e09c57-e0ec-4d8b-b680-8dcbfa8c4b00",
        title: "Hide 'Show/hide reviewed films' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "47d993eb-8de1-46aa-88e3-096902dab498",
        title: "Hide 'Show/hide rewatched films' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "30c62cfe-aec2-45cb-90bb-2a01d9a70bb7",
        title: "Hide 'Show/hide logged films' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "d8d9fa87-e9be-47cd-adbe-caebb0c2009a",
        title: "Hide 'Show/hide rated films' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "3e9daafe-ccab-4e72-883a-cdaf41e2232d",
        title: "Hide 'Show/hide films in watchlist' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "4a589e1f-d063-44cd-85c4-972f18f1df00",
        title: "Hide 'Hide documentaries' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    {
        id: "86dcc4ad-f5f1-491c-8974-34fc4cb903d2",
        title: "Hide 'Hide unreleased titles' filter",
        description: "",
        section: "Filter",
        checked: false
    },
    // ----- SORT ----- DONE
    {
        id: "74b7a53f-6709-4d25-9356-76678b583887",
        title: "Hide 'Film name' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "cb12b7cb-1847-4444-9e7b-e001d1a0187f",
        title: "Hide 'Your interests' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "934b060a-87b5-4bf5-aa81-63459dde49bc",
        title: "Hide 'Film length' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "9823250e-fe67-476f-9657-8fd40e944321",
        title: "Hide 'When Rated' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "9ae4387a-9bb5-4fe4-8f2c-fcb307d323e5",
        title: "Hide 'Shuffle' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "742370ca-b3da-43b5-ab14-694fd3fa5f31",
        title: "Hide 'Your Rating' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "816d24b0-a225-428f-a545-f17d821406f5",
        title: "Hide 'Film Popularity with Friends' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "cbec1b07-eb1a-4257-b775-2ee98c87c902",
        title: "Hide 'Reverse Order' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "4639f75e-b5cc-4a41-8d5b-1eb8290b0c8d",
        title: "Hide 'Your Diary Date' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "08bbda63-0d9d-48ce-ae96-5c844435158f",
        title: "Hide 'Owner Diary Date' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    {
        id: "97a68361-5133-4703-ba85-5b566dd6bee2",
        title: "Hide 'Owner Rating' sort",
        description: "",
        section: "Sort",
        checked: false
    },
    // ----- SEARCH ----- DONE
    {
        id: "15212037-04cc-4ed4-9625-0e7a1974f6d4",
        title: "Enable improved search",
        description: "While you type in the search bar it returns list of films",
        section: "Search",
        checked: false
    },
    // ----- LISTS ----- DONE
    {
        id: "9362e1b5-ea40-4ec7-8319-3f90c16534a1",
        title: "New list always private",
        description: "When you create a new list, it chooses 'private' by default",
        section: "Lists",
        checked: false
    },
    {
        id: "3c4a347a-5f04-47d5-b073-3cefb8ee0bb2",
        title: "Add movie to list always private",
        description: "When you try to add a movie to a list, it goes to private tab by default",
        section: "Lists",
        checked: false
    }
];
