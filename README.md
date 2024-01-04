how does this work?

manifest controls what files are loaded.  

not sure what the background.js is for really, but it doesn't work without it.

popup stuff loads when you click on the extension. this sends a message to the tag content script, which responds and gives the popup the title of the lesson

idea then is to use that to add tags to this lesson title

to update the extension go here:
chrome://extensions/
then toggle developer mode, select load unpacked and navigate to the root directory of this repository


notes about logging:
1. background.js logs to the extensions details ie chrome://extensions
2. tag-content.js logs to the main tab developer console
3. popup.js logs to the console for the extenstion (ie click on dev tools on the extension html)




ok so i did a bunch of work that did kind of the wrong thing and that is ok.  i was looking at the lesson videos instead of the submission videos.  so going back to that bit is next on the list but not tonight maybe.