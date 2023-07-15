import { JSX, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { type Options, defaultOptions } from '@options/defaultOptions';

interface OptionsProviderProps {
  children: JSX.Element;
}

const createOptionsStore = () => {
  const [options, setOptions] = createStore<Options[]>(defaultOptions);

  const toggleChecked = (id: number) => {
    setOptions(
      (option) => option.id === id,
      'checked',
      (checked) => !checked
    );
  };

  return { options, toggleChecked };
};

type ContextType = ReturnType<typeof createOptionsStore>;

const OptionsContext = createContext<ContextType>();

export function OptionsProvider(props: OptionsProviderProps) {
  const { options, toggleChecked } = createOptionsStore();

  return <OptionsContext.Provider value={{ options, toggleChecked }}>{props.children}</OptionsContext.Provider>;
}

export function useOptionsContext() {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error(`Options context not defined`);
  }
  return context;
}
