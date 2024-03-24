import { For, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import Option from "@components/Option";
import { useOptionsContext } from "@context/OptionsContext";
import "@styles/microtip.css";
import { projectTime } from "@configs/project-data";

const Popup = () => {
    const [searchText, setSearchText] = createSignal("");
    const { options } = useOptionsContext();

    return (
        <main class="w-96 p-3">
            <div class="border-b border-b-black mb-2 py-4 flex flex-row justify-between items-center">
                <h1 class="text-lg">Letterboxd Tweaks</h1>
                <a
                    href="https://www.buymeacoffee.com/jserwatka"
                    target="_blank"
                    aria-label={`It took me ${projectTime} hours to build this project, please consider supporting 🤗`}
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
            <input
                type="text"
                placeholder="Search options..."
                class="w-full bg-slate-300 rounded-sm p-2"
                value={searchText()}
                onInput={(e) => setSearchText(e.target.value)}
            ></input>
            <div class="max-h-80 h-auto overflow-auto pr-3">
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
        </main>
    );
};

export default Popup;
