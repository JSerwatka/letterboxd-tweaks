import { Options } from '@options/default-options';

export type ModifyChromeStoregeTasks = 'add' | 'remove';

export const modifyOptionChromeStorage = (id: Options['id'], task: ModifyChromeStoregeTasks) => {
  chrome.storage.sync.get('selectedOptions').then((storage) => {
    let newSelectedOptions = storage['selectedOptions'] as string[];

    if (task === 'add') {
      newSelectedOptions.push(id);
    } else {
      newSelectedOptions = newSelectedOptions.filter((selectedOptionId) => selectedOptionId !== id);
    }

    console.log(newSelectedOptions);
    chrome.storage.sync.set({ selectedOptions: newSelectedOptions });
  });
};
