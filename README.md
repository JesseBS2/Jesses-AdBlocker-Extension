# Description

An ad blocker using just Chromium's extensions feature.
Websites typically display Ads by using an ad service. These services get paid by other companies to display their banners/videos/segments on websites. This comes with the added benefit to the consumer that the content of these ads is stored neatly on a website, and by finding references to those websites those websites on a page, those ads can be removed.

Sometimes ads are built in to/sourced from the website you're trying to visit. So blocking it wouldn't make since; Luckily, now the best way to remove ads is to sort through a webpage and remove elements, so this Ad Blocker also scans for any elements that have id, class, title, or aria-labels that use "ad", "promoted" and such and hides them as well.

I've only got a version for Google Chrome on here, however changing `chrome` to `browser` in the background_script.js file will make it run just fine on Microsoft Edge, Firefox and any other Chromium based browser.



# Download and Setup

1. Download the files as a .zip

2. Unpack the .zip into a folder and remember where on you rcomputer it is located 

3. Open Google Chrome

4. Type into the address bar: chrome://extensions

5. Look in the top right of the page and you will see a "Developer Mode" toggle. Turn it on

6. Select the new option "Load unpacked"

7. Navigate to the unpacked folder in your computer

8. Now it should be loaded. Simply refresh the page you had open
