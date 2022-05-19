chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (!tab.url.startsWith("http:") && !tab.url.startsWith("https:")) return;
    if (info.status == 'complete') { // Only starts blocking once site is fully loaded
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content_script.js']
        });
    }
});