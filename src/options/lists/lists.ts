import { waitForElement } from "@utils/element-observers";

// makes new user list private by default
export async function makeNewListPrivate() {
    const selectedListOption = await waitForElement(document, "[name='sharing'] > option[selected]");
    const privateListOption = await waitForElement(document, "[name='sharing'] > option[value='You']");
    selectedListOption?.removeAttribute("selected");
    privateListOption?.setAttribute("selected", "selected");
}

// forces "add to a private list" as default when adding film to a list
export async function addMovieToPrivateList() {
    const addToListModal = await waitForElement(document, "#add-to-a-list-modal");
    const addToListModalButtons = addToListModal?.querySelector(".js-list-type-toggle > .options");
    const addToListModalBody = addToListModal?.querySelector(".js-add-to-list-body");

    const publicButton = addToListModalButtons?.querySelector("button[data-list-type='public']");
    const privateButton = addToListModalButtons?.querySelector("button[data-list-type='private']");
    publicButton?.classList.remove("-selected");
    privateButton?.classList.add("-selected");

    const publicSelection = addToListModalBody?.querySelector("div[data-list-type='public']");
    const privateSelection = addToListModalBody?.querySelector("div[data-list-type='private']");
    publicSelection?.classList.remove("-selected");
    privateSelection?.classList.add("-selected");
}
