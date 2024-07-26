import { defaultOptions } from "@configs/default-options";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.clear(); // TODO remove for production


    defaultOptions.forEach((option) => {
        option.checked && chrome.storage.sync.set({ [option.id]: option.checked });
    });
});
