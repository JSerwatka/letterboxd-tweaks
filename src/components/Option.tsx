import Switch from '@components/Switch';
import { Options } from '@options/default-options';

type OptionProps = Omit<Options, 'function' | 'section'>;

const Option = (props: OptionProps) => {
  return (
    <div class="my-2 flex justify-between">
      <div>
        <div class="text-xl ">{props.title}</div>
        <span class="text-sm leading-6 text-gray-600">{props.description}</span>
      </div>
      <div class="self-center">
        <Switch id={props.id} checked={props.checked} />
      </div>
    </div>
  );
};

export default Option;
