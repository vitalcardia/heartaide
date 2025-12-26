function pageShowCase(page, params) {
    let curURL = window.location.href;
    let curTitle = document.title;
    history.pushState(null, curTitle, curURL);
    window.onpopstate = function () {
        history.pushState(null, curTitle, curURL);
        window.location.href = page + params;
    };
}

function changeParams(name, value) {
    const params = window.location.search,
        parse = params.split('&');
        parse[0] = parse[0].replace('?', '');

    let queryItems = [],
        preparedQueryParts = [],
        url_string = window.location.href,
        url = new URL(url_string),
        depth = url.searchParams.get("deeper")
    ;

    parse.forEach((item) => {
        queryItems.push(item.split('='));
    });
    queryItems.forEach((item) => {
        if (item.includes('deeper')) {
            item[1] = Number(item[1]) + 1;
        }
        if (item.includes(name) && depth >= 3) {
            item[1] = value;
        }
        preparedQueryParts.push(item.join('='));
    });

    return '?' + preparedQueryParts.join('&');
}

/**
 * call example:  pageShowCase('other_page', changeParams('feed', ''));
 */
function callEvent7() {
    var o = document.createElement("img");
    o.src = "https://" + domain + "/click.php?event7=1";
}

function callEvent10() {
    return null;
}


var backfix = {
    // newLink = backfix.unsetToken(offerLink, 'bf_lander=to_offer2&')
    none: function () {
        return null;
    },

    unsetToken: function (source, name) {
        return source.replace(name, '');
    }
}

function follow(needed) {
    if (needed in backfix) {
        return backfix[needed]();
    }
    return backfix.to_offer();
}

function loadShowcase() {
    const curTitle = document.title;
    window.open(offerLink, '_blank');
    window.focus();
}