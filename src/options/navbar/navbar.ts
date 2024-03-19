import { waitForElement } from "@utils/element-observers";
import {
    ACCOUNT_MENU_SELECTOR,
    MENU_LINKS,
    NAVBAR_LINKS,
    NAVBAR_MENU_SELECTOR,
    NavbarActionsConfig,
    PROFILE_LINKS,
    PROFILE_MENU_SELECTOR
} from "./navbatContainer";
import { performAllActions } from "./navbarUtils";

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

    if (config.toHide?.length && config.toHide?.length > 0) {
        const list = (await profileMenu.querySelector("ul.navlist")) as HTMLElement | null;

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

    performAllActions<typeof PROFILE_LINKS, keyof typeof PROFILE_LINKS>(config, PROFILE_LINKS, profileMenu);
}
export async function navbarMenuActions(
    config: NavbarActionsConfig<keyof typeof NAVBAR_LINKS> = NAVBAR_CONFIG_DEFAULT
): Promise<void> {
    const navbar = await waitForElement(document, NAVBAR_MENU_SELECTOR);
    if (!navbar) return;

    performAllActions<typeof NAVBAR_LINKS, keyof typeof NAVBAR_LINKS>(config, NAVBAR_LINKS, navbar);
}
