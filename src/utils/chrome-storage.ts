import { Options } from "@configs/default-options";
import { SetStoreFunction } from "solid-js/store";

export type StorageSelectedOptions = Record<Options["id"], boolean>;

export const modifyOptionChromeStorage = (id: Options["id"], task: "add" | "remove") => {
    if (task === "add") {
        chrome.storage.sync.set({ [id]: true });
    } else {
        chrome.storage.sync.remove(id);
    }
};

export const syncWithOptionChromeStorage = (
    defaultOptions: Options[],
    setStoreFunction: SetStoreFunction<Options[]>
) => {
    const defaultOptionsCopy = JSON.parse(JSON.stringify(defaultOptions)) as Options[];

    chrome.storage.sync.get(null, (setOptionsIds: StorageSelectedOptions) => {
        Object.keys(setOptionsIds).forEach((optionId) => {
            const checkedOptionIndex = defaultOptionsCopy.findIndex((option) => option.id === optionId);

            defaultOptionsCopy[checkedOptionIndex].checked = true;
        });

        setStoreFunction(defaultOptionsCopy);
    });
};
