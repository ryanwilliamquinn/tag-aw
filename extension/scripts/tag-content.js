console.log("tag-content.js")

function getSelectedVideo() {
    var selectedPlaylistItem = ".playlist-item-title"
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

function getTitle(videoId) {
    // may have to do this two ways, one for the individual page and one for the overview page
    var selector = "#ve_"+videoId+" .lessonname .tooltip"
    return document.querySelector(selector).innerHTML
}

function getLessonId(videoId) {
    // <div class="ve_text_2020 lessonname" style=" width:190px; float:left; padding-left:20px;" onclick="document.location = '/bryan-sutton/learning/150823'">
    //      <span style="color:#ababab; text-transform: uppercase;">LESSON:  “Margaret's Waltz”...</span><span class="tooltip">“Margaret's Waltz” (Intermediate)</span>
    //    </div>
    const selector = "#ve_"+videoId+" .lessonname"
    const elem = document.querySelector(selector) 
    const elemData = elem.outerHTML // for some reason onclick prop of elem was null
    // "function onclick(event) {\ndocument.location = '/bryan-sutton/learning/150823'\n}"
    return /.*bryan-sutton\/learning\/(\d*)/.exec(elemData)[1]
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === "sendTitle") {
            // https://my.artistworks.com/bryan-sutton/videoexchanges/212391?ve_lesson_nid=26019
            const myURL = new URL(window.location.href);
            const path = myURL.pathname.split("/")
            const videoId = path[3]
            let lessonId = myURL.searchParams.get("ve_lesson_nid")
            if (!lessonId) {
                lessonId = getLessonId(videoId)
            }
            console.log("tag-content window.location.href", window.location.href)

            console.log("lesson id: ", lessonId, "video id: ", videoId)
            console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
            var title = getTitle(videoId);
            console.log("the title: " + title)
            var video = getSelectedVideo() || "can't find the video"
            console.log("the video title: " + video)
            sendResponse(JSON.stringify({title, video, lessonId, videoId}));
        }
    }
);
