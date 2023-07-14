import { JSX, createContext, useContext } from 'solid-js';
import { SetStoreFunction, createStore } from 'solid-js/store';

interface OptionsProviderProps {
  children: JSX.Element;
}

interface Options {
  id: number;
  title: string;
  description: string;
  section: string;
  checked: boolean;
}

const defaultOptions: Options[] = [
  { id: 0, title: 'hello', description: 'description', section: 'Main Menu', checked: false },
  { id: 1, title: 'hello2', description: 'description2', section: 'Main Menu', checked: true },
  { id: 2, title: 'hello3', description: 'description3', section: 'Main Menu', checked: true },
  { id: 3, title: 'hello4', description: 'description4', section: 'Main Menu', checked: false }
];

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
