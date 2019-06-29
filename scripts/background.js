chrome.runtime.onInstalled.addListener(function () {
  // chrome.contextMenus.create({
  //   title: 'このページをミュートする',
  //   id: 'pageMute',
  //   type: 'normal',
  //   contexts: ["link"]
  // });

  chrome.contextMenus.create({
    title: 'このドメインをミュートする',
    id: 'domainMute',
    type: 'normal',
    contexts: ["link"]
  });

});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // if (info.menuItemId === 'pageMute') {
  //   var register = {};
  //   register[info.linkUrl] = -1;
  //   chrome.storage.sync.set(register, function () {
  //     console.log(register);
  //     window.alert(info.linkUrl + 'was muted')
  //   });
  // }
  if (info.menuItemId == 'domainMute') {
    const domain = info.linkUrl.match(/^https?:\/\/(.*?)(\/|\?|#|$)/)[1]
    var obje = {}
    obje[domain] = -1
    chrome.storage.sync.set(obje, function() {
      console.log('muted:' + domain)
    })
  }
});
