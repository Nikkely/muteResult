function filterResult(muteList) {
    var searchResultDiv = document.getElementsByClassName('g')
    Array.prototype.forEach.call(searchResultDiv, function (element) {
      targetUrl = element.getElementsByTagName('a')[0].href
      if (muteList[targetUrl] != undefined) {
        element.parentNode.removeChild(muteList)
      }
    })
}

var muteList = null

var observer = new MutationObserver(function () {
  if (muteList == null) {
    chrome.storage.sync.get(null, function (muteList) {
      muteList = muteList
      filterResult(muteList)
    })
  } else {
    filterResult(muteList)
  }
})

observer.observe(document.getElementById('ires'), {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
});
