import { waitForElement } from "@utils/element-observers";
import { link } from "fs";

type LinkSelectorConfig = { linkSelector: string; menuItemSelector: string };
type NavLinksSelectors = Record<string, LinkSelectorConfig>;

// MenuLinks
const ACCOUNT_MENU_SELECTOR = ".main-nav .js-nav-account .subnav";
const MenuLinks = {
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
    }
} as const satisfies NavLinksSelectors;

// ProfileLinks
const PROFILE_MENU_SELECTOR = "nav.profile-navigation";
const ProfileLinks = {
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
    }
} as const satisfies NavLinksSelectors;

// NavbarLinks
const NAVBAR_MENU_SELECTOR = ".main-nav .navitems";
const NavbarLinks = {
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

interface NavbarActionsConfig<T extends keyof NavLinksSelectors> {
    toHide?: T[];
    toRedirect?: Partial<Record<T, { redirectTo: string }>>;
    toRename?: Partial<Record<T, { renameTo: string }>>;
}

export async function accountMenuActions(config: NavbarActionsConfig<keyof typeof MenuLinks>): Promise<void> {
    const accountMenu = await waitForElement(document, ACCOUNT_MENU_SELECTOR);
    if (!accountMenu) return;

    if (config.toHide && config.toHide.length >= 1) {
        const linksFilteredToHide = Object.entries(MenuLinks)
            .filter(([linkName, linkSelectorConfig]) => config.toHide!.includes(linkName as keyof typeof MenuLinks))
            .map(([linkName, linkSelectorConfig]) => linkSelectorConfig);
        removeNavbarItems(accountMenu, linksFilteredToHide);
    }

    if (config.toRedirect && Object.keys(config.toRedirect)) {
        const linksFilteredToRedirect = Object.entries(MenuLinks)
            .filter(([linkName, linkSelectorConfig]) => Object.keys(config.toRedirect!).includes(linkName))
            .map(([linkName, linkSelectorConfig]) => {
                return {
                    linkSelectorConfig: linkSelectorConfig,
                    redirectTo: config.toRedirect![linkName as keyof typeof MenuLinks]?.redirectTo ?? ""
                };
            });

        redirectNavbarItems(accountMenu, linksFilteredToRedirect);
    }

    if (config.toRename && Object.keys(config.toRename).length >= 1) {
        const linksFilteredToRename = Object.entries(MenuLinks)
            .filter(([linkName, linkSelectorConfig]) => Object.keys(config.toRename!).includes(linkName))
            .map(([linkName, linkSelectorConfig]) => {
                return {
                    linkSelectorConfig: linkSelectorConfig,
                    renameTo: config.toRename![linkName as keyof typeof MenuLinks]?.renameTo ?? ""
                };
            });

        renameNavbarItems(accountMenu, linksFilteredToRename);
    }
}

export async function profileMenuActions(config: NavbarActionsConfig<keyof typeof ProfileLinks>): Promise<void> {
    const profileMenu = await waitForElement(document, PROFILE_MENU_SELECTOR);

    if (profileMenu) {
        // remove
        removeNavbarItems(profileMenu, Object.values(ProfileLinks));

        // redirect + rename
        const profileFilmsLink = getLinkByHref(profileMenu, "li", "/films");

        if (profileFilmsLink) {
            profileFilmsLink.textContent = "Watched";
            redirectNavLink(profileFilmsLink, "size/large");
        }
    }
}

export async function navbarMenuActions(config: NavbarActionsConfig<keyof typeof NavbarLinks>): Promise<void> {
    const navbar = await waitForElement(document, NAVBAR_MENU_SELECTOR);

    if (navbar) {
        // remove
        removeNavbarItems(navbar, Object.values(NavbarLinks));

        // redirect
        const navbarFilmsLink = getLinkByHref(navbar, "li.films-page", "/films");

        if (navbarFilmsLink) {
            redirectNavLink(navbarFilmsLink, "size/large");
        }
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
