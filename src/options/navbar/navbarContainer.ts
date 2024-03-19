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

accountMenuActions(ACCOUNT_CONFIG_DEFAULT);
profileMenuActions(PROFILE_CONFIG_DEFAULT);
navbarMenuActions(NAVBAR_CONFIG_DEFAULT);
