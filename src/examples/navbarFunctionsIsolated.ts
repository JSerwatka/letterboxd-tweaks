// import { shouldRunFunctionOnPage, getPageFromPathname } from "@utils/page-lookup";
// import {
//     AccountLinksKeys,
//     NavbarActionsConfig,
//     NavbarLinksKeys,
//     ProfileLinksKeys,
//     accountMenuActions,
//     navbarMenuActions,
//     profileMenuActions
// } from "@options/navbar/navbar";


// const ACCOUNT_CONFIG_DEFAULT: NavbarActionsConfig<AccountLinksKeys> = {
//     toHide: ["Diary", "Home", "Likes", "Networks", "Reviews", "Reviews", "Subscriptions", "Tags"],
//     toRedirect: { Films: { redirectTo: "size/large" } },
//     toRename: { Films: { renameTo: "Watched" } }
// };
// const PROFILE_CONFIG_DEFAULT: NavbarActionsConfig<ProfileLinksKeys> = {
//     toHide: ["Diary", "Invitations", "Likes", "Networks", "Reviews", "Tags"],
//     toRedirect: { Films: { redirectTo: "size/large" } },
//     toRename: { Films: { renameTo: "Watched" } }
// };

// const NAVBAR_CONFIG_DEFAULT: NavbarActionsConfig<NavbarLinksKeys> = {
//     toHide: ["Activity", "Journal", "Members"],
//     toRedirect: { Films: { redirectTo: "size/large" } }
// };

// export const run = () => {
//     if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "accountMenuActions")) {
//         accountMenuActions(ACCOUNT_CONFIG_DEFAULT);
//     }
//     if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "profileMenuActions")) {
//         profileMenuActions(PROFILE_CONFIG_DEFAULT);
//     }
//     if (shouldRunFunctionOnPage(getPageFromPathname(window.location.pathname), "navbarMenuActions")) {
//         navbarMenuActions(NAVBAR_CONFIG_DEFAULT);
//     }
    
// }