import { waitForElement } from "@utils/element-observers";
import { profile } from "console";

const ACCOUNT_MENU_SELECTOR = ".main-nav .js-nav-account .subnav";
const PROFILE_MENU_SELECTOR = "nav.profile-navigation";
const NAVBAR_MENU_SELECTOR = ".main-nav .navitems";

export async function hideAccountMenuLinks() {
    const MenuLinks = {
        Home: "/",
        Diary: "/diary",
        Reviews: "/reviews",
        Likes: "/likes",
        Tags: "/tags",
        Networks: "/following",
        Subscriptions: "/subscriptions"
    } as const;

    const accountMenu = await waitForElement(document, ACCOUNT_MENU_SELECTOR);

    if (accountMenu) {
        for (const [title, link] of Object.entries(MenuLinks)) {
            const element = getNavbarItemByHref(accountMenu, link, true);
            element?.remove();
        }
    }
}

export async function hideProfileMenuLinks() {
    const ProfileLinks = {
        Diary: "/diary",
        Reviews: "/reviews",
        Likes: "/likes",
        Tags: "/tags",
        Networks: "/following",
        Invitations: "/invitations"
    } as const;

    const profileMenu = await waitForElement(document, PROFILE_MENU_SELECTOR);

    if (profileMenu) {
        for (const [title, link] of Object.entries(ProfileLinks)) {
            const element = getNavbarItemByHref(profileMenu, link, true);
            element?.remove();
        }
    }
}

export async function hideNavbarLinks() {
    const NavbarLinks = {
        Activity: "/activity",
        Members: "/members",
        Journal: "/journal"
    } as const;

    const navbar = await waitForElement(document, NAVBAR_MENU_SELECTOR);

    if (navbar) {
        for (const [title, link] of Object.entries(NavbarLinks)) {
            const element = getNavbarItemByHref(navbar, link, true);
            element?.remove();
        }
    }
}

function getNavbarItemByHref(
    navbarElement: Element,
    hrefSubstrig: string,
    getParent: boolean,
    parentSelector = "li"
): Element | null | undefined {
    const linkElement = navbarElement.querySelector(`${parentSelector} a[href*="${hrefSubstrig}"]`);

    if (getParent) {
        return linkElement?.parentElement;
    }

    return linkElement;
}

export async function renameAndRedirect() {
    const accountMenu = await waitForElement(document, ACCOUNT_MENU_SELECTOR);
    const profileMenu = await waitForElement(document, PROFILE_MENU_SELECTOR);

    if (accountMenu) {
        const accountFilmsLink = getNavbarItemByHref(accountMenu, "/films", false);

        if (accountFilmsLink) {
            accountFilmsLink.textContent = "Watched";
            const originalHref = accountFilmsLink.getAttribute("href");
            accountFilmsLink.setAttribute("href", originalHref + "size/large");
        }
    }

    if (profileMenu) {
        const profileFilmsLink = getNavbarItemByHref(profileMenu, "/films", false);

        if (profileFilmsLink) {
            profileFilmsLink.textContent = "Watched";
            const originalHref = profileFilmsLink.getAttribute("href");
            profileFilmsLink.setAttribute("href", originalHref + "size/large");
        }
    }
}

export async function redirect() {
    const navbar = await waitForElement(document, NAVBAR_MENU_SELECTOR);

    if (navbar) {
        const navbarFilmsLink = getNavbarItemByHref(navbar, "/films", false, "li.films-page");
        console.log(navbarFilmsLink);

        if (navbarFilmsLink) {
            const originalHref = navbarFilmsLink.getAttribute("href");
            navbarFilmsLink.setAttribute("href", originalHref + "size/large");
        }
    }
}
