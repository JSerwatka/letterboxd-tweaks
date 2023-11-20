import { waitForElement } from "@utils/element-observers";

type LinkSelectorConfig = { linkSelector: string; menuItemSelector: string };
type NavLinksSelectors = Record<string, LinkSelectorConfig>;
interface NavbarActionsConfig<T extends keyof NavLinksSelectors> {
    toHide?: T[];
    toRedirect?: { [K in T]?: { redirectTo: string } };
    toRename?: { [K in T]?: { renameTo: string } };
}

// MenuLinks
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

// ProfileLinks
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

// NavbarLinks
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

// TODO: only for testing, don't use for prod
const ACCOUNT_CONFIG_DEFAULT: NavbarActionsConfig<keyof typeof MENU_LINKS> = {
    toHide: ["Diary", "Home", "Likes", "Networks", "Reviews", "Reviews", "Subscriptions", "Tags"],
    toRedirect: { Films: { redirectTo: "size/large" } },
    toRename: { Films: { renameTo: "Watched" } }
};

const PROFILE_CONFIG_DEFAULT: NavbarActionsConfig<keyof typeof PROFILE_LINKS> = {
    toHide: ["Diary", "Invitations", "Likes", "Networks", "Reviews", "Tags"],
    toRedirect: { Films: { redirectTo: "size/large" } },
    toRename: { Films: { renameTo: "Watched" } }
};

const NAVBAR_CONFIG_DEFAULT: NavbarActionsConfig<keyof typeof NAVBAR_LINKS> = {
    toHide: ["Activity", "Journal", "Members"],
    toRedirect: { Films: { redirectTo: "size/large" } }
};

export async function accountMenuActions(
    config: NavbarActionsConfig<keyof typeof MENU_LINKS> = ACCOUNT_CONFIG_DEFAULT
): Promise<void> {
    const accountMenu = await waitForElement(document, ACCOUNT_MENU_SELECTOR);
    if (!accountMenu) return;

    performAllActions<typeof MENU_LINKS, keyof typeof MENU_LINKS>(config, MENU_LINKS, accountMenu);
}
export async function profileMenuActions(
    config: NavbarActionsConfig<keyof typeof PROFILE_LINKS> = PROFILE_CONFIG_DEFAULT
): Promise<void> {
    const profileMenu = await waitForElement(document, PROFILE_MENU_SELECTOR);
    if (!profileMenu) return;

    performAllActions<typeof PROFILE_LINKS, keyof typeof PROFILE_LINKS>(config, PROFILE_LINKS, profileMenu);
}
export async function navbarMenuActions(
    config: NavbarActionsConfig<keyof typeof NAVBAR_LINKS> = NAVBAR_CONFIG_DEFAULT
): Promise<void> {
    const navbar = await waitForElement(document, NAVBAR_MENU_SELECTOR);
    if (!navbar) return;

    performAllActions<typeof NAVBAR_LINKS, keyof typeof NAVBAR_LINKS>(config, NAVBAR_LINKS, navbar);
}

function performAllActions<T extends NavLinksSelectors, K extends keyof NavLinksSelectors>(
    config: NavbarActionsConfig<K>,
    navLinksSelectorsObject: T,
    menuElement: Element
) {
    if (config.toHide && config.toHide.length >= 1) {
        const linksFilteredToHide = Object.entries(navLinksSelectorsObject)
            .filter(([linkName, linkSelectorConfig]) => config.toHide!.includes(linkName as K))
            .map(([linkName, linkSelectorConfig]) => linkSelectorConfig);
        removeNavbarItems(menuElement, linksFilteredToHide);
    }

    if (config.toRedirect && Object.keys(config.toRedirect)) {
        const linksFilteredToRedirect = Object.entries(navLinksSelectorsObject)
            .filter(([linkName, linkSelectorConfig]) => Object.keys(config.toRedirect!).includes(linkName))
            .map(([linkName, linkSelectorConfig]) => {
                return {
                    linkSelectorConfig: linkSelectorConfig,
                    redirectTo: config.toRedirect![linkName as keyof T]?.redirectTo ?? ""
                };
            });

        redirectNavbarItems(menuElement, linksFilteredToRedirect);
    }

    if (config.toRename && Object.keys(config.toRename).length >= 1) {
        const linksFilteredToRename = Object.entries(navLinksSelectorsObject)
            .filter(([linkName, linkSelectorConfig]) => Object.keys(config.toRename!).includes(linkName))
            .map(([linkName, linkSelectorConfig]) => {
                return {
                    linkSelectorConfig: linkSelectorConfig,
                    renameTo: config.toRename![linkName as keyof T]?.renameTo ?? ""
                };
            });

        renameNavbarItems(menuElement, linksFilteredToRename);
    }
}

function removeNavbarItems(baseMenuElement: Element, linkSelectorConfigs: LinkSelectorConfig[]): void {
    for (const linkSelectoConfig of linkSelectorConfigs) {
        const menuItem = getLinkByHref(
            baseMenuElement,
            linkSelectoConfig.menuItemSelector,
            linkSelectoConfig.linkSelector
        )?.parentElement;
        menuItem?.remove();
    }
}

function redirectNavbarItems(
    baseMenuElement: Element,
    linkRedirectConfigs: { linkSelectorConfig: LinkSelectorConfig; redirectTo: string }[]
) {
    for (const { linkSelectorConfig, redirectTo } of linkRedirectConfigs) {
        const linkElement = getLinkByHref(
            baseMenuElement,
            linkSelectorConfig.menuItemSelector,
            linkSelectorConfig.linkSelector
        );
        if (!linkElement) return;

        redirectNavLink(linkElement, redirectTo);
    }
}

function renameNavbarItems(
    baseMenuElement: Element,
    linkRenameConfigs: { linkSelectorConfig: LinkSelectorConfig; renameTo: string }[]
) {
    for (const { linkSelectorConfig, renameTo } of linkRenameConfigs) {
        const linkElement = getLinkByHref(
            baseMenuElement,
            linkSelectorConfig.menuItemSelector,
            linkSelectorConfig.linkSelector
        );
        if (!linkElement) return;

        linkElement.textContent = renameTo;
    }
}

function getLinkByHref(
    baseElement: Element,
    parentSelector: string,
    hrefSubstrig: string
): HTMLAnchorElement | null | undefined {
    return baseElement.querySelector(`${parentSelector} a[href*="${hrefSubstrig}"]`) as
        | HTMLAnchorElement
        | null
        | undefined;
}

function redirectNavLink(linkElement: HTMLAnchorElement, redirectPath: string): void {
    const originalHref = linkElement.getAttribute("href");
    linkElement.setAttribute("href", originalHref + redirectPath);
}
