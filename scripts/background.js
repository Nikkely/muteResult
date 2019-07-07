chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'このページをミュートする',
    id: 'pageMute',
    type: 'normal',
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    title: 'このドメインをミュートする',
    id: 'domainMute',
    type: 'normal',
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let targetUrl = info.linkUrl === undefined ? tab.url : info.linkUrl
  if (info.menuItemId === 'pageMute') {
    const pageURL = extractPageURL(targetUrl);
    (new MuteList()).setPageURL(pageURL, -1)
  }
  if (info.menuItemId === 'domainMute') {
    const domain = extractDomain(targetUrl)
    if (domain === null) {
      return
    }
    (new MuteList()).setDomain(domain, -1)
  }
});
