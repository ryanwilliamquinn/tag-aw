console.log("background.js")

async function sendMessageToActiveTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, message);
    // TODO: Do something with the response.
  }

// Wrap in an onInstalled callback to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {
    // Page actions are disabled by default and enabled on select tabs
    chrome.action.disable();
  
    // Clear all rules to ensure only our expected rules are set
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      // Declare a rule to enable the action on example.com pages
      let activePageRule = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            // https://my.artistworks.com/bryan-sutton/videoexchanges?ve_lesson_nid=98472
            pageUrl: {originAndPathMatches: '.*\.artistworks\.com/.*/videoexchanges.+'},
          })
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      };
  
      // Finally, apply our new array of rules
      let rules = [activePageRule];
      chrome.declarativeContent.onPageChanged.addRules(rules);
    });
  });