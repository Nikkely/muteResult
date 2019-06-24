chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'このページをミュートする',
    id: 'pageMute',
    type: 'normal',
    contexts: ["link"]
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'このドメインをミュートする',
    id: 'domainMute',
    type: 'normal',
    contexts: ["link"]
  });
});
