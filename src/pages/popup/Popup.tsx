import { For, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import Option from "@components/Option";
import { useOptionsContext } from "@context/OptionsContext";

const Popup = () => {
    const [searchText, setSearchText] = createSignal("");
    const { options } = useOptionsContext();

    return (
        <main class="w-96 p-3">
            <h1 class="text-lg mb-2 border-b border-b-black">Letterboxd Tweaks</h1>
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
