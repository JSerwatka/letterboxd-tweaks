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
    const file = await import('@options/films');
    file['showFilmsScore']();
}

main();

// TODO https://stackoverflow.com/a/73276111
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message.listPage) {
        console.log('got message', request, sender);
        const selectedListOption = document.querySelector("[name='sharing'] > option[selected]");
        const privateListOption = document.querySelector("[name='sharing'] > option[value='You']");
        selectedListOption?.removeAttribute('selected');
        privateListOption?.setAttribute('selected', 'selected');
    }
});
