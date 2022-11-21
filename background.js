console.log("tag-background.js")

chrome.action.onClicked.addListener((tab) => {
    console.log("tab clicked?", tab)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/tag-content.js']
    });
});