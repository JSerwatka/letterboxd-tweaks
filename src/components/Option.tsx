import Switch from "@components/Switch";
import { type OptionType } from "@configs/default-options";

type OptionProps = Omit<OptionType, "function" | "section">;

const Option = (props: OptionProps) => {
    return (
        <div class="my-5 flex justify-between">
            <div>
                <div class="text-xl">{props.title}</div>
                <span class="text-sm leading-6 text-gray-600">{props.description}</span>
            </div>
            <div class="self-center ml-5">
                <Switch id={props.id} checked={props.checked} />
            </div>
        </div>
    );
};

export default Option;
