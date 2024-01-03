console.log("popup.js")

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function setVideoName() {
    var currentTab = await getCurrentTab();
    console.log("current tab id", currentTab.id)

    chrome.tabs.sendMessage(
        currentTab.id,
        { type: "sendTitle" },
    function (message) {
        if (message == null) {
            return;
        }
        message = JSON.parse(message)
        console.log("the message", message)
        if (message != null) {
            document.getElementById("popup-content").innerHTML = message.title
        }
        fetch("https://y1gt7zeqo3.execute-api.us-east-1.amazonaws.com/default/add-tag", {
          method: 'post',
          headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: message.title
          })
          .then(function (data) {
            console.log('Request succeeded with JSON response', data);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
    })
}

setVideoName();
