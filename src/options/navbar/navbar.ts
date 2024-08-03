import { waitForElement } from "@utils/element-observers";
import { performAllActions } from "./navbarUtils";

export type LinkSelectorConfig = { linkSelector: string; menuItemSelector: string };
export type NavLinksSelectors = Record<string, LinkSelectorConfig>;
export interface NavbarActionsConfig<T extends keyof NavLinksSelectors> {
    toHide?: T[];
    toRedirect?: { [K in T]?: { redirectTo: string } };
    toRename?: { [K in T]?: { renameTo: string } };
}

export type AccountLinksKeys = keyof typeof MENU_LINKS;
export type ProfileLinksKeys = keyof typeof PROFILE_LINKS;
export type NavbarLinksKeys = keyof typeof NAVBAR_LINKS;

// ----------- ACCOUNT MENU ----------------
const ACCOUNT_MENU_SELECTOR = ".main-nav .js-nav-account .subnav";
const MENU_LINKS = {
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

export async function accountMenuActions(config: NavbarActionsConfig<AccountLinksKeys>): Promise<void> {
    const accountMenu = await waitForElement(document, ACCOUNT_MENU_SELECTOR);
    if (!accountMenu) return;

    performAllActions<typeof MENU_LINKS, AccountLinksKeys>(config, MENU_LINKS, accountMenu);
}

// ----------- PROFILE MENU ----------------
const PROFILE_MENU_SELECTOR = "nav.profile-navigation";
const PROFILE_LINKS = {
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
export async function profileMenuActions(config: NavbarActionsConfig<ProfileLinksKeys>): Promise<void> {
    const profileMenu = await waitForElement(document, PROFILE_MENU_SELECTOR);
    if (!profileMenu) return;

    if (config.toHide?.length && config.toHide?.length > 0) {
        const list = (await waitForElement(document, "ul.navlist")) as HTMLElement | null;

        // spread nav elements when some are hidden
        if (list) {
            const firstChild = list.firstElementChild as HTMLElement | null;
            const lastChild = list.lastElementChild as HTMLElement | null;
            if (firstChild) firstChild.style.marginLeft = "0";
            if (lastChild) lastChild.style.marginLeft = "0";

            list.style.display = "flex";
            list.style.justifyContent = "space-evenly";
        }
    }

    performAllActions<typeof PROFILE_LINKS, ProfileLinksKeys>(config, PROFILE_LINKS, profileMenu);
}

// ----------- NAVBAR MENU ----------------
const NAVBAR_MENU_SELECTOR = ".main-nav .navitems";
const NAVBAR_LINKS = {
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

export async function navbarMenuActions(config: NavbarActionsConfig<NavbarLinksKeys>): Promise<void> {
    const navbar = await waitForElement(document, NAVBAR_MENU_SELECTOR);
    if (!navbar) return;

    performAllActions<typeof NAVBAR_LINKS, NavbarLinksKeys>(config, NAVBAR_LINKS, navbar);
}
