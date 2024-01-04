console.log("tag-content.js")

function getSelectedVideo() {
    var selectedPlaylistItem = ".playlist-item.selected .playlist-item-title"
    var nodes = document.querySelectorAll(selectedPlaylistItem)
    if (nodes.length == 0) {
        return;
    }

    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML !== "Teacher's Response") {
            return nodes[i].innerHTML
        }
    }
}

function getTitle() {
    var titleId = "#lesson-player-2020-title"
    var nodes = document.querySelectorAll(titleId)
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
        // https://my.artistworks.com/bryan-sutton/learning/170378/244216
        const urlParts = window.location.href.substring(9).split("/")
        const lessonId = urlParts[3]
        const videoId = urlParts.length > 4 ? urlParts[4] : lessonId

        console.log("tag-content window.location.href", window.location.href)

        console.log("lesson id: ", lessonId, "video id: ", videoId)
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === "sendTitle") {
            var title = getTitle();
            console.log("the title: " + title)
            var video = getSelectedVideo() || "can't find the video"
            console.log("the video title: " + video)
            sendResponse(JSON.stringify({title, video, lessonId, videoId}));
        }
    }
);

