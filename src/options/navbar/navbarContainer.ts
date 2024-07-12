import { SupportedPages, checkIfOptionPage } from "@utils/page-lookup";
import {
    AccountLinksKeys,
    NavbarActionsConfig,
    NavbarLinksKeys,
    ProfileLinksKeys,
    accountMenuActions,
    navbarMenuActions,
    profileMenuActions
} from "./navbar";

// TODO: change config based on user options
// TODO: only for testing, don't use for prod
const ACCOUNT_CONFIG_DEFAULT: NavbarActionsConfig<AccountLinksKeys> = {
    toHide: ["Diary", "Home", "Likes", "Networks", "Reviews", "Reviews", "Subscriptions", "Tags"],
    toRedirect: { Films: { redirectTo: "size/large" } },
    toRename: { Films: { renameTo: "Watched" } }
};
const PROFILE_CONFIG_DEFAULT: NavbarActionsConfig<ProfileLinksKeys> = {
    toHide: ["Diary", "Invitations", "Likes", "Networks", "Reviews", "Tags"],
    toRedirect: { Films: { redirectTo: "size/large" } },
    toRename: { Films: { renameTo: "Watched" } }
};

const NAVBAR_CONFIG_DEFAULT: NavbarActionsConfig<NavbarLinksKeys> = {
    toHide: ["Activity", "Journal", "Members"],
    toRedirect: { Films: { redirectTo: "size/large" } }
};

if (checkIfOptionPage(getPageFromPathname(window.location.pathname), ACCOUNT_MENU_ACTIONS_NEGATIVE_PAGES, true)) {
    accountMenuActions(ACCOUNT_CONFIG_DEFAULT);
}
if (checkIfOptionPage(getPageFromPathname(window.location.pathname), PROFILE_MENU_ACTIONS_NEGATIVE_PAGES, true)) {
    profileMenuActions(PROFILE_CONFIG_DEFAULT);
}
if (checkIfOptionPage(getPageFromPathname(window.location.pathname), NAVBAR_MENU_ACTIONS_NEGATIVE_PAGES, true)) {
    navbarMenuActions(NAVBAR_CONFIG_DEFAULT);
}
