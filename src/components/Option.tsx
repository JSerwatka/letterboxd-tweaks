import Switch from '@components/Switch';
import { Options } from '@src/options/default-options';

type OptionProps = Pick<Options, 'title' | 'description' | 'id'>;

const Option = (props: OptionProps) => {
  return (
    <div class="my-2 flex justify-between">
      <div>
        <div class="text-xl ">{props.title}</div>
        <span class="text-sm leading-6 text-gray-600">{props.description}</span>
      </div>
      <div class="self-center">
        <Switch id={props.id} />
      </div>
    </div>
  );
};

export default Option;
