import { defaultOptions } from "@configs/default-options";

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason !== "install") return;

    defaultOptions.forEach((option) => {
        option.checked && chrome.storage.sync.set({ [option.id]: option.checked });
    });
});
