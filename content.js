    if (typeof(browser) != "undefined") {
        function init() {
            bademsavarStorage = browser.storage.local.get();
            bademsavarStorage.then(function(res) {
                bademsavarBlockedDomainsArr = (res.bademsavarBlockedDomains !== undefined) ? res.bademsavarBlockedDomains : [];
                if (res.bademsavarEnabled === true) {
                    hideResults(bademsavarBlockedDomainsArr);
                    hideNewsList(bademsavarBlockedDomainsArr);
                    hideNews(bademsavarBlockedDomainsArr);
                    hideInnerCards(bademsavarBlockedDomainsArr);
                    hideLinks(bademsavarBlockedDomainsArr);
                }
            });
        }
    } else {
        function init() {
            chrome.storage.local.get(['bademsavarEnabled'], function(res) {
                if (res.bademsavarEnabled === true) {
                    chrome.storage.local.get(['bademsavarBlockedDomains'], function(res) {
                        bademsavarBlockedDomainsArr = (res.bademsavarBlockedDomains !== undefined) ? res.bademsavarBlockedDomains : [];
                        hideResults(bademsavarBlockedDomainsArr);
                        hideNewsList(bademsavarBlockedDomainsArr);
                        hideNews(bademsavarBlockedDomainsArr);
                        hideInnerCards(bademsavarBlockedDomainsArr);
                        hideLinks(bademsavarBlockedDomainsArr);
                    });
                }
            });
        }
    }

    function hideResults(blockedDomains) {
        console.log('hideResults');
        let results = document.querySelectorAll("div > .r");
        for (i = 0; i < results.length; i++) {
            for (j = 0; j < blockedDomains.length; j++) {
                if ((results[i].firstChild) && (typeof(results[i].firstChild.hostname) != "undefined") && (results[i].parentNode.parentNode.parentNode)) {
                    if (results[i].firstChild.hostname.includes(blockedDomains[j]) == true) {
                        results[i].parentNode.parentNode.parentNode.style.display = 'none';
                        break;
                    }
                }
            }
        }
    }

    function hideNewsList(blockedDomains) {
        console.log('hideNewsList');
        let newsList = document.querySelectorAll("h3[role]")[0];
        for (j = 0; j < blockedDomains.length; j++) {
            if (newsList && (typeof(newsList.textContent) != "undefined") && (newsList.parentNode.parentNode.parentNode)) {
                if (newsList.textContent.includes(blockedDomains[j]) == true) {
                    newsList.style.display = 'none';
                    newsList.parentNode.parentNode.parentNode.style.display = 'none';
                    break;
                }
            }
        }
    }

    function hideInnerCards(blockedDomains) {
        console.log('hideInnerCards');
        let innerCards = document.querySelectorAll("g-inner-card");
        for (let i = 0; i < innerCards.length; i++) {
            for (let j = 0; j < blockedDomains.length; j++) {
                if ((typeof(innerCards[i].innerHTML) != "undefined") && (innerCards[i].parentElement) && (innerCards[i].innerHTML.includes(blockedDomains[j]) == true)) {
                    innerCards[i].parentElement.style.display = 'none';
                    break;
                }
            }
        }
    }

    function hideLinks(blockedDomains) {
        console.log('hideLinks');
        let links = document.querySelectorAll("a");
        for (let i = 0; i < links.length; i++) {
            for (let j = 0; j < blockedDomains.length; j++) {
                if ((typeof(links[i].hostname) != "undefined") && (links[i].parentElement) && (links[i].hostname.includes(blockedDomains[j]) == true)) {
                    links[i].parentElement.style.display = 'none';
                    break;
                }
            }
        }

        for (let i = 0; i < links.length; i++) {
            for (let j = 0; j < blockedDomains.length; j++) {
                if ((typeof(links[i].innerHTML) != "undefined") && (links[i].parentElement) && (links[i].innerHTML.includes(blockedDomains[j]) == true)) {
                    links[i].parentElement.style.display = 'none';
                    break;
                }
            }
        }
    }

    function hideNews(blockedDomains) {
        console.log('hideNews');
        let news = document.querySelectorAll(".g");
        for (i = 0; i < news.length; i++) {
            for (j = 0; j < blockedDomains.length; j++) {
                if ((news[i].firstChild.firstChild) && (typeof(news[i].firstChild.firstChild.hostname) != "undefined")) {
                    if (news[i].firstChild.firstChild.hostname.includes(blockedDomains[j]) == true) {
                        news[i].style.display = 'none';
                        break;
                    }
                }
            }
        }
    }

    init();