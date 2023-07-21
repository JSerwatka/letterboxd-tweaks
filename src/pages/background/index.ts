chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.clear(); // TODO remove for production
});
