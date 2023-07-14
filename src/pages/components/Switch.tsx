import { createSignal, createUniqueId } from 'solid-js';

interface SwitchProps {
  id: number;
}

const Switch = (props: SwitchProps) => {
  const [checked, setChecked] = createSignal<boolean>(false);

  const toggleSwitch = () => {
    setChecked(!checked());
  };

  return (
    <div class="flex h-6 items-center">
      <button
        type="button"
        class=" flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        classList={{
          'bg-gray-200': !checked(),
          'bg-indigo-600': checked()
        }}
        role="switch"
        aria-checked="false" // TODO
        onClick={toggleSwitch}
      >
        <span
          aria-hidden="true"
          class="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
          classList={{
            'translate-x-0': !checked(),
            'translate-x-3.5': checked()
          }}
        ></span>
      </button>
    </div>
  );
};

export default Switch;
