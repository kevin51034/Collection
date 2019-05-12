#Chrome extension

This is an extension that changes all the words which indicate in the file


STEP to using the extention


1.In the URL bar, type in chrome://extensions and hit enter. This will bring you to Chrome’s extensions settings page.

2.In the upper right corner, there is a check box that says “Developer mode.” Check this box.

3.Click “Load unpacked extension”,In the file chooser window that pops up,and navigate to the evil-extension directory included in the folder

4. Verify Evil Extension is loaded and make sure the extention is working.


Take this file for instance

The transformTextNodes function should recursively walk the DOM tree and modify the textContents of each text node that contains a “there”, “their”, or “they’re” as necessary(the words indicate in MATCH_LIST of page.js)
