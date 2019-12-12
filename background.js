const initialList = [
    '61saat.com',
    'aa.com.tr',
    'abhaber.com',
    'acunn.com',
    'ahaber.com.tr',
    'ahvalnews.com',
    'ajanshaber.com',
    'ajansspor.com',
    'aksam.com',
    'aktifhaber.com',
    'aspor.com.tr',
    'atv.com.tr',
    'beinsports.com',
    'beyazgazete.com',
    'beyaztv.com.tr',
    'bloomberght.com',
    'boldmedya.com',
    'bolgegundem.com',
    'boxerdergisi.com.tr',
    'bursadabugun.com',
    'caglayandergisi.com',
    'cihan.com.tr',
    'cnnturk.com',
    'cosmopolitanturkiye.com',
    'derintarih.com',
    'dha.com.tr',
    'diyanethaber.com.tr',
    'dunya.com',
    'ensonhaber.com',
    'f5haber.com',
    'fanatik.com',
    'fotomac.com.tr',
    'fotospor.com',
    'fgulen.com',
    'furkanvakfi.org',
    'gazeteciler.com',
    'gazetemanset.com',
    'gazetesok.com',
    'gazetevatan.com',
    'gecce.com',
    'gercekgundem.com',
    'gunes.com',
    'gzt.com',
    'haber3.com',
    'haber365.com.tr',
    'haber7.com',
    'haber61.net',
    'haberler.com',
    'haberturk.com',
    'habervakti.com',
    'habervaktim.com',
    'habervitrini.com',
    'haberx.com',
    'haksozhaber.net',
    'harunyahya.com',
    'harun-yahya.net',
    'harunyahya.web.tr',
    'herkul.org',
    'hurriyet.com',
    'hurriyetdailynews.com',
    'iha.com.tr',
    'incisozluk.com.tr',
    'internethaber.com',
    'iyibilgi.com',
    'ismailaga.org.tr',
    'kadinlarkulubu.com',
    'kadirmisiroglu.com',
    'kanald.com.tr',
    'kanald.international',
    'kanaldhaber.com.tr',
    'kizlarsoruyor.com',
    'lacivertdergi.com',
    'listelist.com',
    'mackolik.com',
    'mansethaber.com',
    'medyafaresi.com',
    'medyatava.com',
    'memurlar.net',
    'milatgazetesi.com',
    'milligazete.com',
    'milliyet.com',
    'mynet.com',
    'neoldu.com',
    'neotempo.com',
    'ntv.com.tr',
    'ntvmsnbc.com',
    'ntvspor.net',
    'objektifhaber.com',
    'onedio.com',
    'posta.com',
    'pressturk.com',
    'radikal.com.tr',
    'rotahaber.com',
    'sabah.com',
    'sacitaslan.com',
    'samanyoluhaber.com',
    'samdan.com.tr',
    'sanalbasin.com',
    'showtv.com.tr',
    'sondakika.com',
    'sorularlaislamiyet.com',
    'sporx.com',
    'star.com.tr',
    'startv.com.tr',
    'superhaber.tv',
    'takvim.com.tr',
    'taraf.com.tr',
    'tgrthaber.com.tr',
    'timeturk.com',
    'todayszaman.com',
    'trt.com.tr',
    'trt.net.tr',
    'trt.tv',
    'trt1.com.tr',
    'trthaber.com',
    'trtspor.com',
    'trtturk.com.tr',
    'trtworld.com',
    'turkeypurge.com',
    'turkiyegazetesi.com.tr',
    'turkuvazradyolar.com',
    'tvnet.com.tr',
    'ulketv.com.tr',
    'yazete.com',
    'yeniakit.com.tr',
    'yeniasir.com.tr',
    'yeniasya.com.tr',
    'yenicaggazetesi.com.tr',
    'yenimesaj.com.tr',
    'yenisafak.com',
    'yirmidorthaber.com',
    'zaman.com.tr'
];

if (typeof(browser) != "undefined") {
    function init(initialList) {
        initialList.sort();
        const firstInit = browser.storage.local.get('bademsavarFirstInit');
        firstInit.then((res) => {
            if (res.bademsavarFirstInit !== true) {
                console.log('BademSavar');
                browser.storage.local.set({ "bademsavarFirstInit": true });
                browser.storage.local.set({ "bademsavarEnabled": true });
                browser.storage.local.set({ "bademsavarBlockedDomains": initialList });
            }
        });
    }
} else {
    function init(initialList) {
        initialList.sort();
        chrome.storage.local.get(['bademsavarFirstInit'], function(res) {
            if (res.bademsavarFirstInit !== true) {
                console.log('BademSavar');
                chrome.storage.local.set({ "bademsavarFirstInit": true });
                chrome.storage.local.set({ "bademsavarEnabled": true });
                chrome.storage.local.set({ "bademsavarBlockedDomains": initialList });
            }
        });
    }
}

init(initialList);