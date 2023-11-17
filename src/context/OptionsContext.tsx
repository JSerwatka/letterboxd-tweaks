import { JSX, createContext, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { type Options, defaultOptions } from "@options/default-options";
import { modifyOptionChromeStorage, syncWithOptionChromeStorage } from "@utils/chrome-storage";

interface OptionsProviderProps {
    children: JSX.Element;
}

const createOptionsStore = () => {
    const [options, setOptions] = createStore<Options[]>(defaultOptions);

    // Sync with Chrome Storage
    createEffect(() => {
        syncWithOptionChromeStorage(defaultOptions, setOptions);
    });

    const handleCheckChange = (id: string, newValue: Options["checked"]) => {
        setOptions((option) => option.id === id, "checked", newValue);
        modifyOptionChromeStorage(id, newValue ? "add" : "remove");
    };

    return { options, handleCheckChange };
};

type ContextType = ReturnType<typeof createOptionsStore>;

const OptionsContext = createContext<ContextType>();

export function OptionsProvider(props: OptionsProviderProps) {
    const { options, handleCheckChange } = createOptionsStore();

    return <OptionsContext.Provider value={{ options, handleCheckChange }}>{props.children}</OptionsContext.Provider>;
}

export function useOptionsContext() {
    const context = useContext(OptionsContext);
    if (context === undefined) {
        throw new Error(`Options context not defined`);
    }
    return context;
}
