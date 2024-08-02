import "@tailwind";
import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
import { StorageSelectedOptions, syncWithOptionChromeStorage } from "@utils/chrome-storage";
import { defaultOptions, FunctionName, Option, Section } from "@configs/default-options";
import { NavbarActionsConfig, NavbarLinksKeys } from "@options/navbar/navbar";
import { SortConfigType } from "@options/sort/sort";

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

type LoadedOptionsType = {
    [K in FunctionName]?: {
        section: Section;
        config?: {
            toHide?: string[];
            toRename?: { [key: string]: { renameTo: string } };
            toRedirect?: { [key: string]: { redirectTo: string } };
        }
    };
};

async function main(): Promise<void> {
    console.log("options");
    const currentPageName = getPageFromPathname(window.location.pathname);
    // await import("@options/films/filmsContainer");
    // console.log({currentPageName});
    // console.log({ shouldRunFunctionOnPage: shouldRunFunctionOnPage(currentPageName, "showFilmData") });

    chrome.storage.sync.get(null, async (userSelectedOptions: StorageSelectedOptions) => {
        const loadedOptions: LoadedOptionsType = {};

        for (const [optionId] of Object.entries(userSelectedOptions)) { 
            const checkedOptionFullData = defaultOptions.find(option => option.id === optionId);

            if (!checkedOptionFullData) {
                console.error(`Option with id ${optionId} not found`);
                return;
            }

            const functionName = checkedOptionFullData.function;


            if (!loadedOptions[functionName]) {
                loadedOptions[functionName] = {
                    section: checkedOptionFullData.section,
                };
            }

            
            if (checkedOptionFullData.config?.toHide) {
                loadedOptions[functionName].config ??= {};
                loadedOptions[functionName].config["toHide"] = [...(loadedOptions[functionName].config.toHide ?? []), ...checkedOptionFullData.config.toHide];

            }

            if ("toRedirect" in (checkedOptionFullData?.config ?? {})) {
                loadedOptions[functionName].config ??= {};
                //@ts-ignore
                loadedOptions[functionName].config["toRedirect"] = {...(loadedOptions[functionName].config.toRedirect ?? {}), ...(checkedOptionFullData?.config?.toRedirect )};
            }

            if ("toRename" in (checkedOptionFullData?.config ?? {})) {
                loadedOptions[functionName].config ??= {};
                //@ts-ignore
                loadedOptions[functionName].config["toRename"] = {...(loadedOptions[functionName].config.toRename ?? {}), ...checkedOptionFullData.config.toRename };
            }
        }

        console.log(loadedOptions);

        
        //     // TODO: remove any
        //     const functionFile = await loadImport(checkedOptionFullData.section) as any;
        //     functionFile[checkedOptionFullData.function]();
        // }
    });
}

main();



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