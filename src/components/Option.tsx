import Switch from '@components/Switch';

interface OptionProps {
  title: string;
  description: string;
  id: number;
}

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
