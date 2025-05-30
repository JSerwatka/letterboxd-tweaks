import "@tailwind";
import { getPageFromPathname, shouldRunFunctionOnPage } from "@utils/page-lookup";
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

const getCrewLinks = () => {
    const castLinks = document.querySelectorAll("#tab-cast .cast-list a");

    castLinks.forEach((crewLink) => {
        let abortController = new AbortController();

        crewLink.addEventListener("pointerenter", (event) => {
            abortController = new AbortController();
            const crewLinkUrl = (event.target as HTMLAnchorElement).getAttribute("href");

            fetch(`https://letterboxd.com/${crewLinkUrl}`, {
                signal: abortController.signal
            })
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        console.error(`Error fetching ${crewLinkUrl}: ${response.status}`);
                    }
                })
                .then((html) => {
                    const parser = new DOMParser();

                    if (!html) {
                        return;
                    }

                    const doc = parser.parseFromString(html, "text/html");
                    const image = doc.querySelector(".avatar.person-image > img") as HTMLImageElement | undefined;
                    const imageUrl = image?.dataset?.image;

                    if (!imageUrl) {
                        return;
                    }

                    console.log(`Crew link: ${imageUrl}`);

                    // update tooltip
                    const tooltip = document.querySelector(".twipsy") as HTMLElement;
                    const tooltiBody = tooltip.querySelector(".twipsy-inner") as HTMLElement;
                    if (!tooltiBody) {
                        return;
                    }

                    const originalBodyWidth = tooltiBody.clientWidth;

 

                    // Clone the existing tooltip
                    const newTooltipBody = tooltip.querySelector('.twipsy-inner')?.cloneNode(true) as HTMLElement;
                    
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.style.height = "100px";
                    imgElement.style.width = "auto";

                    imgElement.addEventListener("load", () => {
                        console.log("image laoded");
                        newTooltipBody.appendChild(imgElement);
                        
                        newTooltipBody.style.display = "flex";
                        newTooltipBody.style.flexDirection = "column";
                        newTooltipBody.style.alignItems = "center";

                        // newTooltipBody.style.maxWidth = "85px";
                        // newTooltipBody.style.whiteSpace = "break-spaces"

                        tooltip.querySelector('.twipsy-inner')?.remove();
                        tooltip.appendChild(newTooltipBody);

                        const tooltipPaddingSum = 18;
                        const imgWithPadding = imgElement.width + tooltipPaddingSum;

                        if ( imgWithPadding > originalBodyWidth ) {
                            const tooltipSizeChange  = imgWithPadding - originalBodyWidth;
                            tooltip.style.left = `calc(${tooltip.style.left} - ${tooltipSizeChange/2}px)`;   
                        }

                        tooltip.style.top = `calc(${tooltip.style.top} - 100px)`;
                    });

                })
                .catch((error) => {
                    console.error(`Error fetching ${crewLinkUrl}: ${error}`);
                });
        });

        crewLink.addEventListener("pointerleave", () => {
            abortController.abort();
        });
    });
};

getCrewLinks();

type LoadedOptionsType = {
    [K in FunctionName]?: {
        section: Section;
        config?: {
            toHide?: string[];
            toRename?: { [key: string]: { renameTo: string } };
            toRedirect?: { [key: string]: { redirectTo: string } };
        };
    };
};

async function main(): Promise<void> {
    const currentPageName = getPageFromPathname(window.location.pathname);

    chrome.storage.sync.get(null, async (userSelectedOptions: StorageSelectedOptions) => {
        const loadedOptions: LoadedOptionsType = {};

        // Collect checked options
        for (const [optionId] of Object.entries(userSelectedOptions)) {
            const checkedOptionFullData = defaultOptions.find((option) => option.id === optionId);

            if (!checkedOptionFullData) {
                console.error(`Option with id ${optionId} not found`);
                return;
            }

            const functionName = checkedOptionFullData.function;

            if (!loadedOptions[functionName]) {
                loadedOptions[functionName] = {
                    section: checkedOptionFullData.section
                };
            }

            if (checkedOptionFullData.config?.toHide) {
                loadedOptions[functionName].config ??= {};
                loadedOptions[functionName].config["toHide"] = [
                    ...(loadedOptions[functionName].config.toHide ?? []),
                    ...checkedOptionFullData.config.toHide
                ];
            }

            if (hasToRedirect(checkedOptionFullData.config)) {
                loadedOptions[functionName].config ??= {};
                loadedOptions[functionName].config["toRedirect"] = {
                    ...(loadedOptions[functionName].config.toRedirect ?? {}),
                    ...checkedOptionFullData?.config?.toRedirect
                };
            }

            if (hasToRename(checkedOptionFullData.config)) {
                loadedOptions[functionName].config ??= {};
                loadedOptions[functionName].config["toRename"] = {
                    ...(loadedOptions[functionName].config.toRename ?? {}),
                    ...checkedOptionFullData.config.toRename
                };
            }
        }

        // Run checked options
        for (const [funtionToRun, functionData] of Object.entries(loadedOptions)) {
            if (!shouldRunFunctionOnPage(currentPageName, funtionToRun as FunctionName)) continue;

            const functionFile = (await loadImport(functionData.section)) as any;
            functionFile[funtionToRun](functionData.config);
        }
    });
}

main();
