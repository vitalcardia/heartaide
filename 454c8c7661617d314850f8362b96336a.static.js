"use strict";

let result = location.pathname.split('/'), // : array
    prelanding = result.some(str => str.indexOf("p_") === 0), // : bool
    landing = result.some(str => str.indexOf("l_") === 0), // : bool
    curURL = window.location.href,
    curTitle = document.title,
    isShown = false,
    anchorItem = 'bf-anchor',
    bfLander = bfl,
    bfOffer = bfo
;

let endpointActions = {
    pushState: function (title, url, endpoint) {
        history.pushState(null, title, url);
        window.onpopstate = function () {
            history.pushState(null, title, url);
            window.location.href = endpoint;
        };
    },

    unsetToken: function (source, name) {
        return source.replace(name, '');
    },

    usePopup: function (popupElement, endpoint) {
        history.pushState(null, curTitle, curURL);
        window.onpopstate = function () {
            history.pushState(null, curTitle, curURL);
            if (isShown === false) {
                popupElement.style.display = 'block';
                isShown = true;
            } else {
                window.location.href = endpoint;
            }
        };
        document.body.onmouseout = function (e) {
            if (e.clientY < 0 && window.isShown === false) {
                popupElement.style.display = 'block';
                isShown = true;
            }
        };
        popupElement.onclick = function (e) {
            if (e.target.id === 'popup') {
                document.getElementById('comeback').style.display = 'none';
            }
        }
    }
};

let endpoints = {
    // to_showcase
    to_showcase: function () {
        return endpointActions.pushState(curTitle, curURL, showCaseLink);
    },

    // to_offer
    to_offer: function () {
        return endpointActions.pushState(curTitle, curURL, offerLink);
    },

    // to_offer2
    to_offer2: function () {
        let newLink = endpointActions.unsetToken(offerLink, 'bf_offer=');
        return endpointActions.pushState(curTitle, curURL, newLink + "&to_offer=2");
    },

    // to_offer2_end -> to nowhere after offer 2
    to_offer2_end: function () {
        let newLink = offerLink.replace('bf_offer=offer_2', 'bf_offer=none');
        return endpointActions.pushState(curTitle, curURL, newLink + "&to_offer=2");
    },

    // to_path2 -> do not use
    to_path2: function () {
        let newLink = endpointActions.unsetToken(offerLink, 'bf=');
        return endpointActions.pushState(curTitle, curURL, newLink + "&to_path=2&set_bid=0");
    },

    // to_anchor
    to_anchor: function (lastSteps = null) {
        history.pushState(null, curTitle, curURL);
        window.onpopstate = function (e) {
            e.preventDefault();
            history.scrollRestoration = 'manual';
            const target = document.getElementById(anchorItem);
            window.setTimeout(function () {
                target.scrollIntoView({behavior: "smooth"});
            }, 100)

            e.stopPropagation();
            window.setTimeout(function () {
                for (let i = 0; i < 6; i++) {
                    pusher(lastSteps, false);
                }
            }, 500);
        }
    },

    // none
    none: function () {
        return null;
    },

    disallowHistory: function () {
        history.pushState(null, curTitle, curURL);
        window.onpopstate = function (e) {
            e.preventDefault();
            history.scrollRestoration = 'manual';
            for (let i = 0; i < 40; i++) {
                history.pushState(null, curTitle, curURL);
            }
        }
    }
};

function callBackfix(params = {}) {
    if (Object.keys(params).length === 0) {
        return pusher('to_showcase');
    }

    params = params.split('-');
	
    let anchor = false; // (params[4] !== "0");

    pusher(params[0], anchor);

    if (params[1] !== '0') {
        window.setTimeout(() => {
            pusher(params[2], anchor);
        }, params[1] * 1000);
    }

    return true;
}

function pusher(endpoint = false, anchor = false) {
    if (endpoint !== false) {
        follow(endpoint)
    }
    if (anchor) {
        endpoints.to_anchor(endpoint);
    }
}

function follow(needed) {
    if (needed in endpoints) {
        console.log('needed ->', needed)
        return endpoints[needed]();
    }
    return endpoints.to_showcase();
}

function lp_reload(){
    let lp_force_reload = false
    let lp_links = document.querySelectorAll("a[href*='lp=1']")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lp_reload = urlParams.get('lp_reload')

    if (lp_reload !== null && lp_links !== null) {
        lp_links.forEach(function(elem) {
            elem.addEventListener('click', function (event) {
                event.preventDefault()
                lp_force_reload = true
                window.open(this.href, '_blank').focus();
                window.location.replace("https://"+domain +"/click.php?key="+lp_reload);
            });
        });

        setInterval(function () {
            if (lp_force_reload)
                window.location.replace("https://"+domain +"/click.php?key="+lp_reload);
        }, 100);
    }
}


function lp_reload_backfix(){
    let lp_force_reload = false
    let lp_links = document.querySelectorAll("a[href*='lp=1']")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lp_reload = urlParams.get('lp_reload_backfix')

    if (lp_reload !== null && lp_links !== null) {
        lp_links.forEach(function(elem) {
            elem.addEventListener('click', function (event) {
                event.preventDefault()
                lp_force_reload = true
                window.open(this.href, '_blank').focus();
                window.location.replace(showCaseLink);
            });
        });

        setInterval(function () {
            if (lp_force_reload) {
                window.location.replace(showCaseLink);
				lp_force_reload = false;
			}
        }, 100);
    }
}

if (prelanding) {
    callBackfix(bfLander);
	lp_reload();
	lp_reload_backfix()
}

if (landing) {
    callBackfix(bfOffer);
}