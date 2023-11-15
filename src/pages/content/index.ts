import { makeNewListPrivate } from '@options/lists';
import '@tailwind';

// TODO run functions of all options in storage
console.log('options');

chrome.storage.onChanged.addListener((changes, areaName) => {
    console.log(changes, areaName);
    if (areaName === 'sync') {
        console.log('local storage has changed', changes);
        // TODO run given option's function
    }
});

async function main() {
    // const file = await import('@options/films');
    // file['showFilmData']();
    const file = await import('@options/navbar');
    file['hideAccountMenuLinks']();
    file['hideProfileMenuLinks']();
    file['hideNavbarLinks']();
}

main();

// TODO https://stackoverflow.com/a/73276111
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message.listPage) {
        console.log('got message', request, sender);
        // makeNewListPrivate();
    }
});
