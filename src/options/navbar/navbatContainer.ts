import { accountMenuActions, navbarMenuActions, profileMenuActions } from "./navbar";

export type LinkSelectorConfig = { linkSelector: string; menuItemSelector: string };
export type NavLinksSelectors = Record<string, LinkSelectorConfig>;
export interface NavbarActionsConfig<T extends keyof NavLinksSelectors> {
    toHide?: T[];
    toRedirect?: { [K in T]?: { redirectTo: string } };
    toRename?: { [K in T]?: { renameTo: string } };
}

// MenuLinks
export const ACCOUNT_MENU_SELECTOR = ".main-nav .js-nav-account .subnav";
export const MENU_LINKS = {
    Home: {
        linkSelector: "/",
        menuItemSelector: "li"
    },
    Diary: {
        linkSelector: "/diary",
        menuItemSelector: "li"
    },
    Reviews: {
        linkSelector: "/reviews",
        menuItemSelector: "li"
    },
    Likes: {
        linkSelector: "/likes",
        menuItemSelector: "li"
    },
    Tags: {
        linkSelector: "/tags",
        menuItemSelector: "li"
    },
    Networks: {
        linkSelector: "/following",
        menuItemSelector: "li"
    },
    Subscriptions: {
        linkSelector: "/subscriptions",
        menuItemSelector: "li"
    },
    Films: {
        linkSelector: "/films",
        menuItemSelector: "li"
    }
} as const satisfies NavLinksSelectors;

// ProfileLinks
export const PROFILE_MENU_SELECTOR = "nav.profile-navigation";
export const PROFILE_LINKS = {
    Diary: {
        linkSelector: "/diary",
        menuItemSelector: "li"
    },
    Reviews: {
        linkSelector: "/reviews",
        menuItemSelector: "li"
    },
    Likes: {
        linkSelector: "/likes",
        menuItemSelector: "li"
    },
    Tags: {
        linkSelector: "/tags",
        menuItemSelector: "li"
    },
    Networks: {
        linkSelector: "/following",
        menuItemSelector: "li"
    },
    Invitations: {
        linkSelector: "/invitations",
        menuItemSelector: "li"
    },
    Films: {
        linkSelector: "/films",
        menuItemSelector: "li"
    }
} as const satisfies NavLinksSelectors;

// NavbarLinks
export const NAVBAR_MENU_SELECTOR = ".main-nav .navitems";
export const NAVBAR_LINKS = {
    Activity: {
        linkSelector: "/activity",
        menuItemSelector: "li.main-nav-activity"
    },
    Members: {
        linkSelector: "/members",
        menuItemSelector: "li.main-nav-people"
    },
    Journal: {
        linkSelector: "/journal",
        menuItemSelector: "li.main-nav-journal"
    },
    Films: {
        linkSelector: "/films",
        menuItemSelector: "li.films-page"
    }
} as const satisfies NavLinksSelectors;

accountMenuActions();
navbarMenuActions();
profileMenuActions();
