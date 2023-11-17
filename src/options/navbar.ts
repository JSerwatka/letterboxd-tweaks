import { waitForElement } from "@utils/element-observers";

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

    const accountMenu = await waitForElement(document, ".main-nav .js-nav-account .subnav");

    if (accountMenu) {
        for (const [title, link] of Object.entries(MenuLinks)) {
            const element = getNavbarItemByHref(accountMenu, link);
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

    const profileMenu = await waitForElement(document, "nav.profile-navigation");

    if (profileMenu) {
        for (const [title, link] of Object.entries(ProfileLinks)) {
            const element = getNavbarItemByHref(profileMenu, link);
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

    const accountMenu = await waitForElement(document, ".main-nav .navitems");

    if (accountMenu) {
        for (const [title, link] of Object.entries(NavbarLinks)) {
            const element = getNavbarItemByHref(accountMenu, link);
            element?.remove();
        }
    }
}

function getNavbarItemByHref(navbarElement: Element, hrefSubstrig: string): Element | null | undefined {
    return navbarElement.querySelector(`li a[href*="${hrefSubstrig}"]`)?.parentElement;
}

// AccountMenu
// TODO: podmień link do watchlist na link do films z filtrem - show films in watchlist (pozwala to na użycie ocen, dużych card i więcej opcji filtrowania) - bardzo problematyczne, bo filtry są robione w cookies a nie w film url
// TODO: Rename “Films” na “Watched” i przenieś od razu na /size/large (https://letterboxd.com/__wichrzyciel__/films/size/large/)

// ProfileMenu - to co powyżej

// Navbar
// TODO: Films → przekierowanie do /films/popular/this/week/ + /size/large/ lub inny default target
