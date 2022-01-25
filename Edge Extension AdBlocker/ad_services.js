adServicesArr = [
    "*://*.zedo.com/*",
    "*://*.googleadservices.com/*",
    "*://*.google-analytics.com/*",
    "*://*.amazon-adsystem.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.adbrite.com/*",
    "*://*.scorecardsearch.com/*",
    "*://*.quantserve.com/*",
    "*://*.doubleclick.net/*",
    "*://*.exponential.com/*",
    "*://*.creative.ak.fbcdn.net/*",
    "*://*.youtube.com/yt/advertise",
    "*://*.verizonmedia.com/*",
    "*://*.trustarc.com/*",
    "*://*.adfoc.us/*",
    "*://*.adnxs.com/*",
    "*://*.flashtalking.com/*",
    "*://*.vdo.ai/*",
    "*://*.2mdn.net/*",
    "*://*.celtra.com/*",
    "*://*.crwdcntrl.net/*",
    "*://*.openx.net/*",
    "*://*.pubmatic.com/*",
    "*://*.rubiconproject.com/*",
    "*://*.lijit.com/*",
    "*://*.3lift.com/*",
    "*://*.indexww.com/*",
    "*://*.criteo.com/*",
    "*://*.waze.com/*",
    "*://*.jumpcloud.com/*",
    "*://*.cloudfront.net/*",
    "*://*.studybreakmedia.com/*",
    "*://*.buysellads.com/*",
    "*://*.marketing360.com/*",
    "*://*.gotoadvantage.com/*",
    "*://*.mirriad.com/*",
    "*://*.enginemediaexchange.com/*",
    "*://*.vidcrunch.com/*",
    "*://*.doubleverify.com/*",
    "*://*.gumgum.com/*",
    "*://*.tubemogul.com/*",
    "*://*.acuityplatform.com/*",
    "*://*.adsrvr.org/*",
    "*://*.rhythmone.com/*",
    "*://*.1rx.com/*",
    "*://*.carbonads.com/*",
    "*://*.anyclip.com/*",
    "*://*.directom.com/*",
    "*://*.go2speed.org/*",

    "*://*.gstatic.com/*/promos/*"
]

chrome.webRequest.onBeforeRequest.addListener(
    function (details) { return { cancel: true } },
    { urls: adServicesArr },
    ["blocking"]
)