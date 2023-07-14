import { createEffect, createMemo, createSignal, createUniqueId } from 'solid-js';
import { useOptionsContext } from '../context/OptionsContext';
import { unwrap } from 'solid-js/store';

interface SwitchProps {
  id: number;
}

const Switch = (props: SwitchProps) => {
  const { options, toggleChecked } = useOptionsContext();
  const isChecked = () => options[props.id].checked;

  return (
    <div class="flex h-6 items-center">
      <button
        type="button"
        class=" flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        classList={{
          'bg-gray-200': !isChecked(),
          'bg-indigo-600': isChecked()
        }}
        role="switch"
        aria-checked="false" // TODO
        onClick={[toggleChecked, props.id]}
      >
        <span
          aria-hidden="true"
          class="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
          classList={{
            'translate-x-0': !isChecked(),
            'translate-x-3.5': isChecked()
          }}
        ></span>
      </button>
    </div>
  );
};

export default Switch;
