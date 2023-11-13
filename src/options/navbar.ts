// const accountNav = await waitForElement(document, ".main-nav .nav-account");
// console.log(accountNav);
// let liElement = accountNav?.querySelector('li a[href*="/films/reviews"]')?.parentNode;
// console.log(liElement)


function getNavbarItemByHref(navbarElement: HTMLElement, hrefSubstrig: string): Element | null | undefined {
    return navbarElement.querySelector(`li a[href*="${hrefSubstrig}"]`)?.parentElement;
}