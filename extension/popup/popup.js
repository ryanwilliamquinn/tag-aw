console.log("popup.js")

const tags = document.querySelectorAll(".tag")
tags.forEach(tag => {
  tag.addEventListener("click", function(elem) {
    elem.target.classList.contains("selected") ? 
    elem.target.classList.remove("selected") : elem.target.classList.add("selected")
  })
})

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


let data = {}

async function setVideoName() {
  console.log("in set video name")
  var currentTab = await getCurrentTab();
  if (!currentTab) {
    return
  }

  setTimeout(function() {
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
  }, 100);
}

setVideoName()


function submit() {
  const tags = Array.from(document.querySelectorAll(".tag.selected")).map(t => t.innerHTML)
  console.log("selected tags:", tags)
  data.tags = tags

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
