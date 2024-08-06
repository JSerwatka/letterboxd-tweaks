import { defaultOptions, OptionType } from "@configs/default-options";
import groupBy from "lodash.groupby";
import { createSignal, For } from "solid-js";

const OptionItem = (props: {
    isOpen: boolean;
    id: OptionType["id"];
    title: OptionType["title"];
    explanationImageName: OptionType["explanationImageName"];
    onToggle: (id: OptionType["id"]) => void;
}) => {
    return (
        <div class="bg-white rounded-2xl shadow-md mb-5">
            <div
                class={`text-lg font-semibold p-5 pr-20 relative flex items-center cursor-pointer ${
                    props.isOpen ? "active" : ""
                }`}
                onClick={() => props.onToggle(props.id)}
            >
                {props.title}
                <span
                    class={`absolute right-5 text-3xl transition-transform duration-200 origin-center ${
                        props.isOpen ? "rotate-45" : ""
                    }`}
                >
                    +
                </span>
            </div>
            <div
                class={`overflow-hidden transition-all duration-500 ease-in-out ${
                    props.isOpen ? "max-h-[500px]" : "max-h-0"
                }`}
            >
                <div class="flex justify-center items-center p-5">
                    <img
                        class="w-auto h-auto max-h-[450px] bg-white"
                        src={`/info/${props.explanationImageName}.png`}
                        alt={props.explanationImageName}
                    />
                </div>
            </div>
        </div>
    );
};

const Options = () => {
    const [openItemId, setOpenItemId] = createSignal<OptionType["id"] | null>(null);
    const groupedOptions = () => groupBy(defaultOptions, (item) => item.section);
    const sections = Object.keys(groupedOptions());

    const toggleItem = (id: OptionType["id"]) => {
        setOpenItemId((currentId) => (currentId === id ? null : id));
    };

    return (
        <div class=" flex justify-center items-center flex-col py-12 px-4">
            <div class="w-full max-w-3xl">
                <For each={sections}>
                    {(section) => (
                        <>
                            <h1 class="text-3xl font-bold mb-6">{section}</h1>
                            <For each={groupedOptions()[section]}>
                                {(option) => {
                                    if (!option.explanationImageName) {
                                        return null;
                                    }

                                    return (
                                        <OptionItem
                                            id={option.id}
                                            title={option.title}
                                            explanationImageName={option.explanationImageName}
                                            isOpen={openItemId() === option.id}
                                            onToggle={toggleItem}
                                        />
                                    );
                                }}
                            </For>
                        </>
                    )}
                </For>
            </div>
        </div>
    );
};

export default Options;
