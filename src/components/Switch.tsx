import { useOptionsContext } from "@context/OptionsContext";
import { Options } from "@options/default-options";

type SwitchProps = Pick<Options, "id" | "checked">;

const Switch = (props: SwitchProps) => {
    const { handleCheckChange } = useOptionsContext();

    return (
        <div class="flex h-6 items-center">
            <button
                type="button"
                class=" flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                classList={{
                    "bg-gray-200": !props.checked,
                    "bg-indigo-600": props.checked
                }}
                role="switch"
                aria-checked="false" // TODO handle change
                onClick={() => handleCheckChange(props.id, !props.checked)}
            >
                <span
                    aria-hidden="true"
                    class="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    classList={{
                        "translate-x-0": !props.checked,
                        "translate-x-3.5": props.checked
                    }}
                ></span>
            </button>
        </div>
    );
};

export default Switch;
