chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.clear(); // TODO remove for production
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const { status, url } = tab;
    if (status !== "complete" || !url) return;

    if (url.includes("letterboxd.com/list/new/")) {
        chrome.tabs.sendMessage(tabId, { message: { listPage: true } });
    }
});
