import { For, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import Option from "@components/Option";
import { optionsChanged, useOptionsContext } from "@context/OptionsContext";
import "@styles/microtip.css";
import { projectTime } from "@configs/project-data";
import groupBy from "lodash.groupby";
import { Section } from "@configs/default-options";
import { InfoIcon } from "@components/InfoIcon";

type SectionFilter = Section | "all";
const FILTER_SECTIONS: SectionFilter[] = ["all", "films", "filter", "lists", "navbar", "search", "sort"];

const Popup = () => {
    const [sectionFilter, setSectionFilter] = createSignal<SectionFilter>("all");
    const { options } = useOptionsContext();
    const groupedOptions = () => groupBy(options, (item) => item.section);

    const groupedOptionsFiltered = () => {
        if (sectionFilter() === "all") {
            return groupedOptions();
        }
        return { [sectionFilter()]: groupedOptions()[sectionFilter()] };
    };

    return (
        <main class="w-[450px] p-3">
            <div class="py-4 flex flex-row justify-between items-center">
                <div class="flex flex-row items-center gap-3">
                    <img src="/icons/logo-48.png" alt="Letterboxd Tweaks Logo" />
                    <h1 class="text-lg">Letterboxd Tweaks</h1>
                </div>
                <a
                    href="https://www.buymeacoffee.com/jserwatka"
                    target="_blank"
                    aria-label={`It took me over ${projectTime} to build this project, please consider supporting 🤗`}
                    data-microtip-position="bottom"
                    role="tooltip"
                    data-microtip-size="medium"
                >
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        style="height: 40px !important; width: auto !important"
                    />
                </a>
            </div>
            <hr class="border-black" />
            <div class={`flex gap-3 mt-3 p-2 rounded-md ${optionsChanged() ? "bg-yellow-200" : "bg-sky-200"}`}>
                <div class="mb-3">
                    <InfoIcon />
                </div>
                <div class="text-sm">
                    {!optionsChanged() ? (
                        <>
                            <span class="block">Not sure what given option changes?</span>
                            <span class="block">
                                <a
                                    class="no-underline text-fuchsia-700 font-semibold"
                                    target="_blank"
                                    href={chrome.runtime.getURL("/src/pages/options/index.html")}
                                >
                                    Click here
                                </a>{" "}
                                for visual guide to every option.
                            </span>
                        </>
                    ) : (
                        <>
                            Option applied <span class="font-semibold">please reload the page</span> to see the changes.
                        </>
                    )}
                </div>
            </div>
            <div class="text-lg pt-4 pb-2">
                <div>Filter by feature category:</div>
                <select
                    class="w-full border border-black rounded-md"
                    name="sectionFilter"
                    onChange={(e) => setSectionFilter(e.target.value as SectionFilter)}
                    value={sectionFilter()}
                >
                    <For each={FILTER_SECTIONS}>{(section) => <option value={section}>{section}</option>}</For>
                </select>
            </div>
            <div class="max-h-80 h-auto overflow-auto pr-3 mt-3">
                {Object.entries(groupedOptionsFiltered()).map(([section, options]) => (
                    <div>
                        <h1 class="text-center text-xl bg-gray-200 rounded-md py-2">
                            {section[0].toUpperCase() + section.slice(1)}
                        </h1>
                        <For each={options}>
                            {(option) => (
                                <Option
                                    id={option.id}
                                    title={option.title}
                                    description={option.description}
                                    checked={option.checked}
                                />
                            )}
                        </For>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Popup;
