var gMuteList = null
chrome.storage.sync.get(null, muteList => {
  gMuteList = muteList
})

var gTotalTime = 0
var gFilterdResult = []

var gObserver = new MutationObserver(() => {
  if (gMuteList == null) {
    chrome.storage.sync.get(null, muteList => {
      gMuteList = muteList
      filterResult(muteList)
    })
  } else {
    filterResult(gMuteList)
  }
})

gObserver.observe(document.documentElement, {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: true
});

function filterResult(muteList) {
  const startTime = performance.now()
  let isChanged = false
  let searchResultDiv = document.getElementsByClassName('g')
  Array.prototype.forEach.call(searchResultDiv, element => {
    let targetUrl = element.getElementsByTagName('a')[0].href
    let targetDomain = targetUrl.match(/^https?:\/\/(.*?)(\/|\?|#|$)/)[1]
    if (muteList[targetDomain] != undefined) {
      console.log('muted: ' + targetDomain);
      // element.parentNode.removeChild(element)
      element.style.display = 'none'
      gFilterdResult.push(element)
      isChanged = true
    }
  })
  const endTime = performance.now()
  if (isChanged === true) {
    gTotalTime += endTime - startTime
    const resultStats = document.getElementById('resultStats')
    if (resultStats !== null) {
      gObserver.disconnect()
      resultStats.innerHTML += '<a>&nbsp;muted ' + gFilterdResult.length + ' items' + '&nbsp;(' + (gTotalTime / 1000).toFixed(3) + 's)</a>'
    }
  }
}

// document.addEventListener("DOMContentLoaded", e => {
//   var observer = new MutationObserver(() => {
//     if (gMuteList == null) {
//       chrome.storage.sync.get(null, muteList => {
//         gMuteList = muteList
//         filterResult(muteList)
//       })
//     } else {
//       console.log('use cache');
//       filterResult(gMuteList)
//     }
//   })
//
//   observer.observe(document.documentElement, {
//     // attributes: true,
//     // characterData: true,
//     childList: true,
//     subtree: true
//   });
// })
