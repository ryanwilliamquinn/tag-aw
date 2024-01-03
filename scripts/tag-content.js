console.log("tag-content.js")

function getTitle() {
    var nodes = document.querySelectorAll(".playlist-item-title")
    if (nodes.length == 0) {
        return;
    }

    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML !== "Teacher's Response") {
            return nodes[i].innerHTML
        }
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === "sendTitle") {
            var title = getTitle();
            console.log("the title: " + title)
            sendResponse(JSON.stringify({title}));
        }
    }
);

