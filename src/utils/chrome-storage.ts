import { type OptionType } from "@configs/default-options";
import { SetStoreFunction } from "solid-js/store";

export type StorageSelectedOptions = Record<OptionType["id"], boolean>;

export const modifyOptionChromeStorage = (id: OptionType["id"], task: "add" | "remove") => {
    if (task === "add") {
        chrome.storage.sync.set({ [id]: true });
    } else {
        chrome.storage.sync.remove(id);
    }
};

export const syncWithOptionChromeStorage = (
    defaultOptions: OptionType[],
    setStoreFunction: SetStoreFunction<OptionType[]>
) => {
    const defaultOptionsCopy = JSON.parse(JSON.stringify(defaultOptions)) as OptionType[];

    chrome.storage.sync.get(null, (setOptionsIds: StorageSelectedOptions) => {
        defaultOptionsCopy.forEach((option) => {
            if (setOptionsIds[option.id]) {
                option.checked = true;
            } else {
                option.checked = false;
            }
            return option;
        });

        setStoreFunction(defaultOptionsCopy);
    });
};

export async function isOptionEnabled(optionId: string): Promise<boolean> {
    return new Promise((resolve) => {
        try {
            chrome.storage.sync.get(optionId, (result) => {
                if (chrome.runtime.lastError) {
                    console.warn(`Storage access error for option ${optionId}:`, chrome.runtime.lastError);
                    resolve(false);
                    return;
                }
                resolve(result[optionId] === true);
            });
        } catch (error) {
            console.warn(`Error checking option ${optionId}:`, error);
            resolve(false);
        }
    });
}
