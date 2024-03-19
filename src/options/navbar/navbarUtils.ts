import { getLinkByHref } from "@utils/selectors";
import { LinkSelectorConfig, NavLinksSelectors, NavbarActionsConfig } from "./navbar";

export function performAllActions<T extends NavLinksSelectors, K extends keyof NavLinksSelectors>(
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

export function removeNavbarItems(baseMenuElement: Element, linkSelectorConfigs: LinkSelectorConfig[]): void {
    for (const linkSelectoConfig of linkSelectorConfigs) {
        const menuItem = getLinkByHref(
            baseMenuElement,
            linkSelectoConfig.menuItemSelector,
            linkSelectoConfig.linkSelector
        )?.parentElement;
        menuItem?.remove();
    }
}

export function redirectNavbarItems(
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

export function renameNavbarItems(
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

export function redirectNavLink(linkElement: HTMLAnchorElement, redirectPath: string): void {
    const originalHref = linkElement.getAttribute("href");
    linkElement.setAttribute("href", originalHref + redirectPath);
}
