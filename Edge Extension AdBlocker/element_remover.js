change_href(); 



 /* Hardcoded ad-block locations */

setTimeout(() => {
    // Google
    if (window.location.href.startsWith("https://www.google.com/search")) {
        tryID("tads");
        tryID("bottomads");
        tryID("tvcap");
        tryClass("GhTN2e");
        tryClass("cNSxrc");
    }

    // Youtube
    if (window.location.hostname.includes("youtube.")) {
        tryID("player-ads");
        tryID("masthead-ad");

        tryTag("ytd-promoted-sparkles-text-search-renderer");
        tryTag("ytd-promoted-sparkles-web-renderer");

        tryTag("ytd-display-ad-renderer");
    }

    // Curseforge
    if (window.location.hostname.includes("curseforge.")) {
        tryID("cdm-zone-03");
        tryID("lngtd_vid_container");
    }

    // WikiHow
    if (window.location.hostname.includes("wikihow.")){
        tryID("adBlock");
    }

    // Amazon
    if (window.location.hostname.includes("amazon.")) {
        tryID("ape_Detail_desktop-detail-ilm_desktop_placement");
        tryClass("_bXVsd_container_GMk6b");
        tryClass("AdHolder")
        tryClass("sp_hqp_shared_adLink")
        tryID("sp_hqp_shared")
        tryID("ape_Detail_ams-detail-right-v2_desktop_placement")
        tryID("hero-quick-promo")
        tryID("ape_Search_auto-bottom-advertising-0_portal-batch-fast-btf-loom_placement")
        tryID("ape_Search_auto-bottom-advertising-0_portal-batch-fast-btf-loom_placement_Feedback")

    }

}, 100);

setTimeout(() => {
    tryCommon("minecraftforge", "amazon", ["imgur", "UploadSpinner-contentWrapper"], ["youtube", "masthead-skeleton-icon"], ["youtube","ytp-load-progress"]);
}, 125);


function change_href() {
    for (var links = 0; links < document.getElementsByTagName("a").length; links++) {
        let element = document.getElementsByTagName("a")[links];

        if (element.href.includes("adfoc.us")) {
            element.href = element.href.split("&url=")[1];
            console.log("[JS2 Ad-blocker]", "Changed adfoc.us link.");
        }
    }
}






function tryCommon(...arguments) {

    var commons_list = ["ad","ads", "advertisement", "advertising", "sponsored", "promo", "promoted", "cdm"]
    var wrapper_list = ["-", " ", "_"]

    for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
        var div = document.getElementsByTagName("div")[i]
        commons_list.forEach(title => {
            wrapper_list.forEach(wrapper => {
                let dontdo = false
                arguments.forEach(exception => {
                    if (window.location.hostname.includes(exception[0] + ".") && div.id === exception[1]) {
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

                div.id = div.id.toLowerCase()

                if (div.id.includes(wrapper + title + wrapper) || div.id.includes(title + wrapper) || div.id.includes(wrapper + title) || div.id.includes(title)) {
                    if (title == "ad" || title == "ads" || title == "cdm") {
                        if (div.id != title && div.id.includes(wrapper + title + wrapper) === false) {
                            if (div.id.indexOf(wrapper + title) > 0 || div.id.indexOf(title + wrapper) == -1 || div.id.indexOf(wrapper + title) < (div.id.length - (wrapper + title).length - 1)) {
                                return;
                            }
                        }
                    } else if (title.includes("skip") && !title.includes("unskippable")) {
                        return;
                    }

                    div.style.display = "none";
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
                                        return
                                    }
                                }
                            } else if (title.includes("skip") && !title.includes("unskippable")) {
                                return;
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