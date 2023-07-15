console.log('background test2');
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    selectedOptions: []
  });
});
