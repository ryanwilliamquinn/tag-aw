console.log("popup.js")

async function getCurrentTab() {
    console.log("popup window.location.href", window.location.href)
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

let data = {}

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
        data = message;
        console.log("the message", message)
        if (message != null) {
            document.getElementById("page-title").innerHTML = message.title
            document.getElementById("video-title").innerHTML = message.video
        }
        document.getElementById("submitButton").addEventListener("click", submit);
    })
}

setVideoName();

function submit() {
        const tags = document.getElementById("tags").value
        if (tags) {
          data.tags = tags.split(",")
        }

        fetch("https://vww50ldxsb.execute-api.us-east-1.amazonaws.com/default/add-tag", {
          method: 'post',
          headers: {
            "Content-type": "text/plain"
          },
          body: JSON.stringify(data)
        })
        .then(function (response) {
          console.log('Request succeeded with JSON response', response);
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
}
