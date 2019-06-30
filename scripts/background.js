chrome.runtime.onInstalled.addListener(() => {
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
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let targetUrl = info.linkUrl
  if (info.linkUrl === undefined) {
    targetUrl = tab.url
  }
  // if (info.menuItemId === 'pageMute') {
  //   var register = {};
  //   register[info.linkUrl] = -1;
  //   chrome.storage.sync.set(register, () => {
  //     console.log(register);
  //     window.alert(info.linkUrl + 'was muted')
  //   });
  // }
  if (info.menuItemId == 'domainMute') {
    const domain = extractDomain(targetUrl)
    if (domain === null) {
      return
    }
    var obje = {}
    obje[domain] = -1
    setMuteList(obje, () => {
      console.log('muted:' + domain)
    })
  }
});
