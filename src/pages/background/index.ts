import { defaultOptions } from "@configs/default-options";

chrome.runtime.onInstalled.addListener(() => {
    defaultOptions.forEach((option) => {
        option.checked && chrome.storage.sync.set({ [option.id]: option.checked });
    });
});
