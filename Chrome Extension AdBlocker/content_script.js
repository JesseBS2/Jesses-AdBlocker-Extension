print("Ran Content Modifier.");

for (var links = 0; links < document.getElementsByTagName("a").length; links++) {
    let element = document.getElementsByTagName("a")[links];

    if (element.href.includes("adfoc.us")) {    // full screen ads? no thank you
        element.href = element.href.split("&url=")[1];
        print("Changed adfoc.us link",'debug');
    }
}


let services = [
    "sstatic.net",
    "smartadserver.com",
    "zedo.com",
    "googleadservices.com",
    "google-analytics.com",
    "amazon-adsystem.com",
    "googlesyndication.com",
    "adbrite.com",
    "scorecardsearch.com",
    "quantserve.com",
    "doubleclick.net",
    "exponential.com",
    "creative.ak.fbcdn.net",
    "youtube.com/yt/advertise",
    "verizonmedia.com",
    "trustarc.com",
    "adfoc.us",
    "adnxs.com",
    "flashtalking.com",
    "vdo.ai",
    "2mdn.net",
    "celtra.com",
    "crwdcntrl.net",
    "openx.net",
    "pubmatic.com",
    "rubiconproject.com",
    "lijit.com",
    "3lift.com",
    "indexww.com",
    "criteo.com",
    "waze.com",
    "jumpcloud.com",
    "cloudfront.net",
    "studybreakmedia.com",
    "buysellads.com",
    "marketing360.com",
    "gotoadvantage.com",
    "mirriad.com",
    "enginemediaexchange.com",
    "vidcrunch.com",
    "doubleverify.com",
    "gumgum.com",
    "tubemogul.com",
    "acuityplatform.com",
    "adsrvr.org",
    "rhythmone.com",
    "1rx.com",
    "carbonads.com",
    "anyclip.com",
    "directom.com",
    "go2speed.org",
    "akamaihd.net",
    "moatads.com",
    "infolinks.com",
    "primis.tech",
    "ggpht.com",
    "snigel.com",
    "everestads.net"
];

let adentifiers = ["advertising", "advertisement", "ads", "ad", "sponsored", "promoted", "promo"];
let adwrappers = ["-", " ", "_"];
let runthroughs = [];
let startonly = [];
let endonly = [];
let avoidance = ["blocker", "block", "skip"];

for (var j = 0; j < adentifiers.length; j++) {
    for (var i = 0; i < adwrappers.length; i++) {
        if (["ads", "ad"].includes(adentifiers[j])) {
            startonly.push(adentifiers[j] + adwrappers[i]);
            endonly.push(adwrappers[i]+adentifiers[j])
        } else {
            runthroughs.push(adentifiers[j]);
            runthroughs.push(adentifiers[j] + adwrappers[i]);
            runthroughs.push(adwrappers[i] + adentifiers[j]);
        }

        runthroughs.push(adwrappers[i] + adentifiers[j] + adwrappers[i]);
    }
}


let elems = document.body.getElementsByTagName("*");
for (let j = 0; j < elems.length; j++) {
    let current = elems[j]
    for (let i = 0; i < services.length; i++) {
        let adservice = services[i];
        
        if (current.src && current.src.includes(adservice) || current.href && current.href.toString().includes(adservice)) {
            print(`Removed Element <elem src="${current.src}" href="${current.href}"></elem>\nMatched with: ${adservice}`,'blue');
            current.style.opacity = "0%";
            break;
        }

    }

    for (let i = 0; i < runthroughs.length; i++) {
        let adlabel = runthroughs[i];
        let startflag = false;
        let endflag = false;
        let escapeflag = false;

        /* Loop mania! Performance issues? Probably. */
        for (let h = 0; h < avoidance.length; h++) {
            if (current.id.toLowerCase().includes(avoidance[h]) || current.classList.toString().toLowerCase().includes(avoidance[h]) || current.title && current.title.toLowerCase().includes(avoidance[h]) || current.ariaLabel && current.ariaLabel.toLowerCase().includes(avoidance[h])) {
                escapeflag = true;
                break;
            }
        }

        if (escapeflag) {
            break;
        }

        if (startonly.includes(adlabel)) {
            startflag = true;
        } else if (endonly.includes(adlabel)) {
            endflag = true;
        }


        if (current.id == adlabel || current.classList.toString().split(" ").includes(adlabel) || current.title && current.title == adlabel || current.ariaLabel && current.ariaLabel == adlabel) {
            print(`Removed Element <elem id="${current.id}" class="${current.className}" title="${current.title}" aria-label="${current.ariaLabel}" ></elem>\nMatched with: ${adlabel}`, 'blue');
            current.style.opacity = "0%";
            break;
        } else if (startflag) {
            if (current.id.toLowerCase().startsWith(adlabel) || current.classList.toString().toLowerCase().startsWith(adlabel) || current.title && current.title.toLowerCase().startsWith(adlabel) || current.ariaLabel && current.ariaLabel.toLowerCase().startsWith(adlabel)) {
                print(`Removed Element <elem id="${current.id}" class="${current.className}" title="${current.title}" aria-label="${current.ariaLabel}" ></elem>\nMatched with: ${adlabel}`, 'blue');
                current.style.opacity = "0%";
                break;
            }
        } else if (endflag) {
            if (current.id.toLowerCase().endsWith(adlabel) || current.classList.toString().toLowerCase().endsWith(adlabel) || current.title && current.title.toLowerCase().endsWith(adlabel) || current.ariaLabel && current.ariaLabel.toLowerCase().endsWith(adlabel)) {
                print(`Removed Element <elem id="${current.id}" class="${current.className}" title="${current.title}" aria-label="${current.ariaLabel}" ></elem>\nMatched with: ${adlabel}`, 'blue');
                current.style.opacity = "0%";
                break;
            }
        }else if (current.id.toLowerCase().includes(adlabel) || current.classList.toString().toLowerCase().includes(adlabel) || current.title && current.title.toLowerCase().includes(adlabel) || current.ariaLabel && current.ariaLabel.toLowerCase().includes(adlabel)) {
            print(`Removed Element <elem id="${current.id}" class="${current.className}" title="${current.title}" aria-label="${current.ariaLabel}" ></elem>\nMatched with: ${adlabel}`, 'blue');
            current.style.opacity = "0%";
            break;
        } else if (current.id.includes(grammarly(adlabel)) || current.classList.toString().includes(grammarly(adlabel)) || current.title && current.title.includes(grammarly(adlabel)) || current.ariaLabel && current.ariaLabel.includes(grammarly(adlabel)) ) {
            print(`Removed Element <elem id="${current.id}" class="${current.className}" title="${current.title}" aria-label="${current.ariaLabel}" ></elem>\nMatched with: ${grammarly(adlabel)}`, 'blue');
            current.style.opacity = "0%";
            break;
        }

    }
}



// Google
if (window.location.href.startsWith("https://www.google.com/search")) {
    tryID("tads"); // Ads that show up as links on the first page of Google search results
    tryID("bottomads")
    tryID("tvcap"); // shopping ads
    tryClass("GhTN2e"); // same as above but under 'shopping' section
    tryClass("cNSxrc"); // lefover from above class, just a text wrapper
}

// Youtube
if (window.location.hostname.includes("youtube.")) {
    // when going back to the youtube homepage with the icon, the ads are reloaded but this script is not, gotta fix that

    tryID("player-ads"); // big block on the right of the screen, above the recommendeds
    tryID("sparkles-container");
    tryID("masthead-ad"); // big block above the youtube homepage

    // ads above the search feed when looking for a video
    tryTag("ytd-promoted-sparkles-text-search-renderer");
    tryTag("ytd-promoted-sparkles-web-renderer");

    // more custom ad tags
    tryTag("ytd-display-ad-renderer");
}

// Curseforge
if (window.location.hostname.includes("curseforge.")) {
    tryID("cdm-zone-03"); // A built-in ad that can't be removed with ad services
    tryID("lngtd_vid_container");
}

// WikiHow
if (window.location.hostname.includes("wikihow.")) {
    tryID("adBlock"); // ads above the search result
}

// Amazon
if (window.location.hostname.includes("amazon.")) {
    // ad banner above product page
    tryID("ape_Detail_desktop-detail-ilm_desktop_placement");
    // individual blocks of ads
    tryClass("_bXVsd_container_GMk6b");
    tryClass("AdHolder")
    // button under product page
    tryClass("sp_hqp_shared_adLink")
    tryID("sp_hqp_shared")
    tryID("ape_Detail_ams-detail-right-v2_desktop_placement")
    tryID("hero-quick-promo")
    // ad at bottom of page
    tryID("ape_Search_auto-bottom-advertising-0_portal-batch-fast-btf-loom_placement")
    tryID("ape_Search_auto-bottom-advertising-0_portal-batch-fast-btf-loom_placement_Feedback")

}




// try some common ad ids and classes
function tryCommon(...arguments) {

    var commons_list = ["ad","ads", "advertisement", "advertising", "sponsored", "promo", "promoted", "cdm"]
    var wrapper_list = ["-", " ", "_"]

    for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
        var div = document.getElementsByTagName("div")[i]
        commons_list.forEach(title => { // loop through some common ids/classes for ads on websites to have
            wrapper_list.forEach(wrapper => { // loop through things that those might have surrounding them as seperators
                let dontdo = false
                arguments.forEach(exception => {
                    if (window.location.hostname.includes(exception[0] + ".") && div.id === exception[1]) {
                        dontdo = true;
                    } else if (window.location.hostname.includes(exception + ".")) {
                        dontdo = "complex"
                    }
                });

                if (dontdo == true) {
                    return console.log("[JS2 Ad-blocker]", "Found Exception");
                } else if (dontdo == "complex") {
                    return; // complex dontdos are blocking the whole website which would flood the console with exceptions
                }

                div.id = div.id.toLowerCase();

                if (div.id.includes(wrapper + title + wrapper) || div.id.includes(title + wrapper) || div.id.includes(wrapper + title) || div.id.includes(title)) {
                    /* some common ad detectors will be found in words or abbreviations, this insures a more specific detection for these small ad labels */
                    if (title == "ad" || title == "ads" || title == "cdm") {
                        if (div.id != title && div.id.includes(wrapper + title + wrapper) === false) {
                            if ( div.id.indexOf(title + wrapper) == -1 || div.id.indexOf(wrapper + title) < (div.id.length - (wrapper + title).length - 1)) {
                                return; /*console.log("[JS2 Ad-blocker]","Canceled #" + div.id);*/
                            }
                        }
                    }

                    if (title.includes("skip") && !title.includes("unskippable")) {
                        console.log("skipper");
                        return; //is an ad skipper like a button
                    }

                    div.style.display = "none";
                    //div.classList += " BlockedByJesseLOL";
                    console.log("[JS2 Ad-blocker]","Detected possible ad, hid element id: #" + div.id);
                } else {
                    div.classList.forEach(item => {
                        var dontdo = false;
                        arguments.forEach(exception => {
                            if (window.location.hostname.includes(exception[0] + ".") && item === exception[1]) {
                                dontdo = true;
                            } else if (window.location.hostname.includes(exception + ".")) {
                                dontdo = "complex"
                            }
                        })

                        if (dontdo == true) {
                            return console.log("[JS2 Ad-blocker]", "Found Exception");
                        } else if (dontdo == "complex") {
                            return;
                        }

                        item = item.toLowerCase()
                        if (item.includes(wrapper + title + wrapper) || item.includes(title + wrapper) || item.includes(wrapper + title) || item.includes(title)) {
                            if (title == "ad" || title == "cdm") {
                                if (item != title && item.includes(wrapper + title + wrapper) === false) {
                                    if (item.indexOf(wrapper + title) == -1 || item.indexOf(title + wrapper) == -1 || item.includes(wrapper + title) && item.indexOf(wrapper + title) == item.length - (wrapper + title).length - 1 || item.includes(title + wrapper) && item.indexOf(title + wrapper) == 0) {
                                        return /*console.log("[JS2 Ad-blocker]","Canceled ." + item);*/
                                    }
                                }
                            }
                            if (title.includes("skip") && !title.includes("unskippable")) {
                                return; //is an ad skipper like a button
                            }

                            div.style.display = "none";
                            console.log("[JS2 Ad-blocker]","Detected possible ad, hid element class: ." + item);
                        }
                    });
                }
            });
        });
    }
}


// take a string and hide the element ID that matches it and hide them
function tryID(ad) {
    try {
        document.getElementById(ad).style.display = "none";
    } catch (error) {
        if (error.toString().includes("(reading 'style')")) {
            print("Failed hiding element ID #" + ad, "error");
        } else {
            throw error;
        }
    }
}

// take a string and loop through all the element tag's that match it and hide them
function tryTag(promo) {
    try {
        promo = document.getElementsByTagName(promo)

        for (var i = 0; i < promo.length; i++) {
            promo[i].style.display = "none";
        }
    } catch (error) {
        if (error.toString().includes("(reading 'style')")) {
            print("Failed hiding element Tag " + promo, "error");
        } else {
            throw error;
        }
    }
}

// take a string and loop through all the classes that match it and hide them
function tryClass(promo) {
    try {
        promo = document.getElementsByClassName(promo)

        for (var i = 0; i < promo.length; i++) {
            promo[i].style.display = "none";
        }
    } catch (error) {
        if (error.toString().includes("(reading 'style')")) {
            print("Failed hiding element Tag " + promo, "warn");
        } else {
            throw error;
        }
    }
}

function print(text, col) {
    col = col || "log";
    switch (col) {
        case 'red' || 'error':
            console.error("[Jesse's Chrome Ad-blocker]: " + text);
            break;
        case 'yellow' || 'warn':
            console.warn("[Jesse's Chrome Ad-blocker]: " + text);
            break;
        case 'blue' || 'verbose' || 'debug':
            console.debug("[Jesse's Chrome Ad-blocker]: " + text);
            break;
        case 'white' || 'plain' || 'log':
            console.log("[Jesse's Chrome Ad-blocker]: " + text);
            break;
        default:
            console.log("[Jesse's Chrome Ad-blocker]: " + text);
            break;
    }
}

function grammarly(text) {
    return text[0].toUpperCase() + text.slice(1, text.length);
}

print("Finished Content Modifier.");