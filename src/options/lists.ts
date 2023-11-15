import { waitForElement } from '@utils/element-observers';

// Makes new user list private by default
export async function makeNewListPrivate() {
    const selectedListOption = await waitForElement(document, "[name='sharing'] > option[selected]");
    const privateListOption = await waitForElement(document, "[name='sharing'] > option[value='You']");
    selectedListOption?.removeAttribute('selected');
    privateListOption?.setAttribute('selected', 'selected');
}
