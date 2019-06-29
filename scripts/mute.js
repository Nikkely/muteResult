function filterResult(muteList) {
    const startTime = performance.now()
    let searchResultDiv = document.getElementsByClassName('g')
    Array.prototype.forEach.call(searchResultDiv, function (element) {
      let targetUrl = element.getElementsByTagName('a')[0].href
      let targetDomain = targetUrl.match(/^https?:\/\/(.*?)(\/|\?|#|$)/)[1]
      if (muteList[targetDomain] != undefined) {
        console.log('muted: ' + targetDomain);
        // element.parentNode.removeChild(element)
        element.style.display = 'none'
      }
    })
  const endTime = performance.now()
  console.log("filtering: " + (endTime - startTime) + "ms");
}

var gMuteList = null

document.addEventListener("DOMContentLoaded", function (e) {
  var observer = new MutationObserver(function () {
    if (gMuteList == null) {
      chrome.storage.sync.get(null, function (muteList) {
        gMuteList = muteList
        filterResult(muteList)
      })
    } else {
      filterResult(gMuteList)
    }
  })

  observer.observe(document.getElementById('ires'), {
    // attributes: true,
    // characterData: true,
    childList: true,
    subtree: true
  });
})
