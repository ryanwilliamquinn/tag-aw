console.log("popup.js")

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function setVideoName() {
    var currentTab = await getCurrentTab();
    console.log("tab", currentTab);
    console.log("current tab id", currentTab.id)

    chrome.tabs.sendMessage(
        currentTab.id,
        { type: "sendTitle" },
    function (message) {
        console.log("arguments", arguments)
        console.log("the message", message)
        if (message != null) {
            document.getElementById("popup-content").innerHTML = message
        }
    })
}

setVideoName();