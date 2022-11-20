console.log("tag-background.js")

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      if (changeInfo.url) {
        console.log("the url:", changeInfo.url)
      }
    }
  );
