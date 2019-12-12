var showHiddenText = document.querySelector(".showHiddenText");
var showHiddenLink = document.querySelector(".showHiddenLink");
var exportListLink = document.querySelector(".exportListLink");
var showHiddenLinkIcon = showHiddenLink.querySelector("img.icon");

if (typeof(browser) != "undefined") {
    function init() {
        bademsavarEnabled = browser.storage.local.get("bademsavarEnabled");
        bademsavarEnabled.then(function(res) {
            if (res.bademsavarEnabled === true) {
                showHiddenLinkIcon.src = "images/showed.svg";
                showHiddenText.innerText = "Bademleri göster!";
            } else {
                showHiddenLinkIcon.src = "images/hidden.svg";
                showHiddenText.innerText = "Bademleri gizle!";
            }
        });
        bademsavarBlockedDomains = browser.storage.local.get("bademsavarBlockedDomains");
        bademsavarBlockedDomains.then(function(res) {
            bademsavarBlockedDomainsArr = (res.bademsavarBlockedDomains !== undefined) ? res.bademsavarBlockedDomains : [];
            displayDomains(bademsavarBlockedDomainsArr);
        });
    }
} else {
    function init() {
        chrome.storage.local.get(['bademsavarEnabled'], function(res) {
            if (res.bademsavarEnabled === true) {
                showHiddenLinkIcon.src = "images/showed.svg";
                showHiddenText.innerText = "Bademleri göster!";
            } else {
                showHiddenLinkIcon.src = "images/hidden.svg";
                showHiddenText.innerText = "Bademleri gizle!";
            }
        });
        chrome.storage.local.get(['bademsavarBlockedDomains'], function(res) {
            bademsavarBlockedDomainsArr = (res.bademsavarBlockedDomains !== undefined) ? res.bademsavarBlockedDomains : [];
            displayDomains(bademsavarBlockedDomainsArr);
        });
    }
}

if (typeof(browser) != "undefined") {
    function reloadPage() {
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then((tabs) => {
            browser.tabs.reload();
        });
    }
} else {
    function reloadPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(res) {
            chrome.tabs.reload();
        });
    }
}

function storeDomain(domain) {
    if (domain !== "") {
        if (bademsavarBlockedDomainsArr.indexOf(domain) === -1) {
            bademsavarBlockedDomainsArr.push(domain);
            bademsavarBlockedDomainsArr.sort();
            if (typeof(browser) != "undefined") {
                browser.storage.local.set({ "bademsavarBlockedDomains": bademsavarBlockedDomainsArr });
            } else {
                chrome.storage.local.set({ "bademsavarBlockedDomains": bademsavarBlockedDomainsArr });
            }
            displayDomains(bademsavarBlockedDomainsArr);
            reloadPage();
        } else {
            alert("Bu badem zaten ekli!");
        }
    }
}

function deleteDomain() {
    let domain = this.parentNode.querySelector(".domainsList__rowDomain").innerText;
    let index = bademsavarBlockedDomainsArr.indexOf(domain);
    bademsavarBlockedDomainsArr.splice(index, 1);
    if (typeof(browser) != "undefined") {
        browser.storage.local.set({ "bademsavarBlockedDomains": bademsavarBlockedDomainsArr });
    } else {
        chrome.storage.local.set({ "bademsavarBlockedDomains": bademsavarBlockedDomainsArr });
    }
    displayDomains(bademsavarBlockedDomainsArr);
    reloadPage();
}

function displayDomains(blockedDomains) {
    let domainsWrapper = document.querySelector(".domainsList");
    domainsWrapper.innerHTML = "";
    let df = document.createDocumentFragment();
    if (blockedDomains.length === 0) {
        let noDomains = document.createElement("span");
        let noDomainsTxt = document.createTextNode("İstenmeyen badem yok!");
        noDomains.appendChild(noDomainsTxt);
        df.appendChild(noDomains);
    }
    for (let i = 0; i < blockedDomains.length; i++) {
        let row = document.createElement("div");
        row.classList.add("domainsList__row");
        let domain = document.createElement("div");
        domain.classList.add("domainsList__rowDomain");
        let domainTxt = document.createTextNode(blockedDomains[i]);
        let delBtn = document.createElement("button");
        delBtn.classList.add("domainsList__rowDelBtn");
        let delBtnIcon = document.createElement("img");
        delBtnIcon.src = "images/remove.svg";
        delBtnIcon.classList.add("icon");
        domain.appendChild(domainTxt);
        delBtn.appendChild(delBtnIcon);
        row.appendChild(domain);
        row.appendChild(delBtn);
        df.appendChild(row);
        delBtn.addEventListener("click", deleteDomain, false);
    }
    domainsWrapper.appendChild(df);
}

function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function convertArrayToBademsavarFormat(arr) {
    var bademsavarFormatObject = [];
    arr.forEach(element => {
        bademsavarFormatObject.push({
            domainName: element
        })
    });
    return JSON.stringify(bademsavarFormatObject);
}

var bademsavarForm = document.querySelector("form");
bademsavarForm.addEventListener("submit", function(e) {
    var domainPattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (domainPattern.test(bademsavarForm.domain.value)) {
        e.preventDefault();
        storeDomain(bademsavarForm.domain.value);
        bademsavarForm.querySelector("[name='domain']").value = "";
    } else {
        alert("Geçerli bir alan adı girin!");
    }
});

showHiddenLink.addEventListener("click", (e) => {
    if (typeof(browser) != "undefined") {
        bademsavarEnabled = browser.storage.local.get("bademsavarEnabled");
        bademsavarEnabled.then(function(res) {
            if (res.bademsavarEnabled === true) {
                bsEnabled = false;
                showHiddenLinkIcon.src = "images/hidden.svg";
                showHiddenText.innerText = "Bademleri gizle!";
            } else {
                bsEnabled = true;
                showHiddenLinkIcon.src = "images/showed.svg";
                showHiddenText.innerText = "Bademleri göster!";
            }
            browser.storage.local.set({ "bademsavarEnabled": bsEnabled });
            reloadPage();
        });
    } else {
        chrome.storage.local.get(["bademsavarEnabled"], function(res) {
            if (res.bademsavarEnabled === true) {
                bsEnabled = false;
                showHiddenLinkIcon.src = "images/hidden.svg";
                showHiddenText.innerText = "Bademleri gizle!";
            } else {
                bsEnabled = true;
                showHiddenLinkIcon.src = "images/showed.svg";
                showHiddenText.innerText = "Bademleri göster!";
            }
            chrome.storage.local.set({ "bademsavarEnabled": bsEnabled });
            reloadPage();
        });
    }
});

exportListLink.addEventListener("click", (e) => {
    download(convertArrayToBademsavarFormat(bademsavarBlockedDomainsArr), 'savilan-badem-listesi.json', 'application/json');
});

init();