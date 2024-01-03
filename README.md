how does this work?

manifest controls what files are loaded.  

not sure what the background.js is for really, but it doesn't work without it.

popup stuff loads when you click on the extension. this sends a message to the tag content script, which responds and gives the popup the title of the lesson

idea then is to use that to add tags to this lesson title

to update the extension go here:
chrome://extensions/
then toggle developer mode, select load unpacked and navigate to the root directory of this repository
