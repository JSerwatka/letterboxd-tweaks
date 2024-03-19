export function cleanEmptyDescriptionLabels(sortMenu: HTMLElement) {
    const sortDescriptionLabelElements = sortMenu.querySelectorAll("span.smenu-sublabel.-uppercase");

    sortDescriptionLabelElements.forEach((labelElement) => {
        const labelParent = labelElement.parentElement;
        const parentSibling = labelParent?.nextElementSibling;

        if (parentSibling?.querySelector("span.smenu-sublabel.-uppercase") || parentSibling === null) {
            labelParent?.remove();
        }
    });
}
