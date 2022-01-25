/* This file removes elements that aren't referenced from another website but are still dedicated ad sections */


/* 
    Some websites have a download button that links to adfocus
    adfocus shows a full-screen ad that is usually a fake download button and a virus

*/

change_href(); 



 /* Known Ad Locations */

setTimeout(() => {
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
        tryID("masthead-ad"); // big block above the youtube homepage

        // ads above the search feed when looking for a video
        tryTag("ytd-promoted-sparkles-text-search-renderer");
        tryTag("ytd-promoted-sparkles-web-renderer");
    }

    // Curseforge
    if (window.location.hostname.includes("curseforge.")) {
        tryID("cdm-zone-03"); // A built-in ad that can't be removed with ad services
        tryID("lngtd_vid_container");
    }

    // WikiHow
    if (window.location.hostname.includes("wikihow.")){
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

}, 500);

setTimeout(() => {
    tryCommon("minecraftforge", "amazon", ["imgur", "UploadSpinner-contentWrapper"], ["youtube", "masthead-skeleton-icon"], ["youtube","ytp-load-progress"]);
    /*
     * Exemptions reasoning
     * The download page for Forge is wrapped in one big div labeled "promoted-wrapper" which means the entire page his hidden
     * Amazon has too many complex ids and classes that can hide non-ad elements
     * */
}, 500 + 50);


// dodge adfocus webpage
function change_href() {
    for (var links = 0; links < document.getElementsByTagName("a").length; links++) {
        let element = document.getElementsByTagName("a")[links];

        if (element.href.includes("adfoc.us")) {
            element.href = element.href.split("&url=")[1];
            console.log("[JS2 Ad-blocker]","Changed adfoc.us link.")
        }
    }
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
                    if (window.location.hostname.includes(exception[0] + ".") && div.id === exception[1] || window.location.hostname.includes(exception + ".")) {
                        dontdo = true;
                    }
                })

                if (dontdo == true) {
                    return console.log("[JS2 Ad-blocker]","Found Exception");
                }

                div.id = div.id.toLowerCase()

                if (div.id.includes(wrapper + title + wrapper) || div.id.includes(title + wrapper) || div.id.includes(wrapper + title) || div.id.includes(title)) {
                    /* some common ad detectors will be found in words or abbreviations, this insures a more specific detection for these small ad labels */
                    if (title == "ad" || title == "cdm") {
                        if (div.id != title && div.id.includes(wrapper + title + wrapper) === false) {
                            if (div.id.indexOf(wrapper + title) == -1 || div.id.indexOf(title + wrapper) == -1 || div.id.includes(wrapper + title) && div.id.indexOf(wrapper + title) == div.id.length - (wrapper + title).length - 1 || div.id.includes(title + wrapper) && div.id.indexOf(title + wrapper) == 0) {
                                return; /*console.log("[JS2 Ad-blocker]","Canceled #" + div.id);*/
                            }
                        }
                    }

                    div.style.display = "none";
                    //div.classList += " BlockedByJesseLOL";
                    console.log("[JS2 Ad-blocker]","Detected possible ad, hid element id: #" + div.id);
                } else {
                    div.classList.forEach(item => {
                        var dontdo = false;
                        arguments.forEach(exception => {
                            if (window.location.hostname.includes(exception[0] + ".") && item === exception[1] || window.location.hostname.includes(exception + ".")) {                       
                                dontdo = true;
                            }
                        })

                        if (dontdo == true) {
                            return console.log("[JS2 Ad-blocker]", "Found Exception");
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
                            div.style.display = "none";
                            //div.classList += " BlockedByJesseLOL";
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
            console.log("[JS2 Ad-blocker] Failed hiding element ID #" + ad);
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
            console.log("[JS2 Ad-blocker] Failed hiding element Tag " + promo);
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
            console.log("[JS2 Ad-blocker] Failed hiding element Tag " + promo);
        } else {
            throw error;
        }
    }
}