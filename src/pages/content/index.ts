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
