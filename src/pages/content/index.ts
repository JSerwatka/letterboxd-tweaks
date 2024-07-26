import "@tailwind";
import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
import { StorageSelectedOptions } from "@utils/chrome-storage";
import { defaultOptions, Section } from "@configs/default-options";

// TODO run functions of all options in storage

// console log all options in storage

// chrome.storage.onChanged.addListener((changes, areaName) => {
//     console.log(changes, areaName);
//     if (areaName === "sync") {
//         // console.log("local storage has changed", changes);
//         // TODO run given option's function
//     }
// });

const loadImport = (section: Section) => {
    switch (section) {
        case "films":
            return import("@options/films/films");
        case "filter":
            return import("@options/filter/filter");
        case "lists":
            return import("@options/lists/lists");
        case "navbar":
            return import("@options/navbar/navbar");
        case "search":
            return import("@options/search/search");
        case "sort":
            return import("@options/sort/sort");
        default:
            console.error(`Section ${section} not found`);
    }
};

async function main(): Promise<void> {
    console.log("options");
    const currentPageName = getPageFromPathname(window.location.pathname);
    // await import("@options/films/filmsContainer");
    // console.log({currentPageName});
    // console.log({ shouldRunFunctionOnPage: shouldRunFunctionOnPage(currentPageName, "showFilmData") });

    chrome.storage.sync.get(null, async (userSelectedOptions: StorageSelectedOptions) => {
        for (const [optionId] of Object.entries(userSelectedOptions)) {
            const checkedOptionFullData = defaultOptions.find(option => option.id === optionId);
            if (!checkedOptionFullData) {
                console.error(`Option with id ${optionId} not found`);
                continue;
            }

            // TODO: remove any
            const functionFile = await loadImport(checkedOptionFullData.section) as any;
            functionFile[checkedOptionFullData.function]();
        }
    });

    // const file = await import("@options/films");
    // file["showFilmData"]();
    // await import("@options/films/filmsContainer");
    // await import("@options/films/filmsContainer");
    // await import("@options/filter/filterContainer");
    // file["renderSearch"]();
    // file["addMovieToPrivateList"]();
    // file["profileMenuActions"]();
    // file["redirect"]();
    // file['hideProfileMenuLinks']();
    // file['hideNavbarLinks']();
}

main();
