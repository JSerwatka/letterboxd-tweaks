import { waitForElement } from "@utils/element-observers";

const ACCOUNT_MENU_SELECTOR = ".main-nav .js-nav-account .subnav";
const PROFILE_MENU_SELECTOR = "nav.profile-navigation";
const NAVBAR_MENU_SELECTOR = ".main-nav .navitems";

// TODO config for every function should be passed through arguments, structure like this { toHide: ["Home", ...], toRedirect: { <name>: <redirect> }, toRename: { <name>: <new_name> } }

type LinkSelectorConfig = { linkSelector: string; menuItemSelector: string };
type NavLinksSelectors = Record<string, LinkSelectorConfig>;

export async function accountMenuActions(): Promise<void> {
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

    const accountMenu = await waitForElement(document, ACCOUNT_MENU_SELECTOR);

    if (accountMenu) {
        // remove
        removeNavbarItems(accountMenu, Object.values(MenuLinks));

        // redirect + rename
        const accountFilmsLink = getLinkByHref(accountMenu, "li", "/films");

        if (accountFilmsLink) {
            accountFilmsLink.textContent = "Watched";
            redirectNavLink(accountFilmsLink, "size/large");
        }
    }
}

export async function profileMenuActions(): Promise<void> {
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

export async function navbarMenuActions(): Promise<void> {
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
