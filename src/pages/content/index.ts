import "@tailwind";
import { getPageFromPathname } from "@utils/page-lookup";
import { StorageSelectedOptions } from "@utils/chrome-storage";
import { defaultOptions, FunctionName, hasToRedirect, hasToRename, Section } from "@configs/default-options";

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
    const currentPageName = getPageFromPathname(window.location.pathname);

    chrome.storage.sync.get(null, async (userSelectedOptions: StorageSelectedOptions) => {
        const loadedOptions: LoadedOptionsType = {};

        // Collect checked options
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

            if (hasToRedirect(checkedOptionFullData.config)) {
                loadedOptions[functionName].config ??= {};
                loadedOptions[functionName].config["toRedirect"] = {...(loadedOptions[functionName].config.toRedirect ?? {}), ...(checkedOptionFullData?.config?.toRedirect )};
            }

            if (hasToRename(checkedOptionFullData.config)) {
                loadedOptions[functionName].config ??= {};
                loadedOptions[functionName].config["toRename"] = {...(loadedOptions[functionName].config.toRename ?? {}), ...checkedOptionFullData.config.toRename };
            }
        }

        // Run checked options
        for (const [funtionToRun, functionData] of Object.entries(loadedOptions)) {
            const functionFile = await loadImport(functionData.section) as any;
            functionFile[funtionToRun](functionData.config);
        }
    });
}

main();

