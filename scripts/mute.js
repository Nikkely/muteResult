getAllMuteList() //先に全件取得して変数に格納しておく

var gObserver = new MutationObserver(() => {
  getAllMuteList(muteList => {
    let success = filterResult(muteList)
    if (success === true) {
      gObserver.disconnect() // 検索結果がまとまって送られてくる前提
      hideFilterd()
      printResult()
    }
  })
})
var observeOptions = {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: true
}
gObserver.observe(document.documentElement, observeOptions);

var gFilterdResult = {}
function filterResult(muteList) {
  let isFound = false
  let searchResultDiv = document.getElementsByClassName('g')
  Array.prototype.forEach.call(searchResultDiv, element => {
    let targetUrl = element.getElementsByTagName('a')[0].href
    let targetDomain = extractDomain(targetUrl)
    if (muteList[targetDomain] != undefined) {
      gFilterdResult[targetUrl] = element
      isFound = true
    }
  })
  return isFound
}
var gResultMesseage = null
var gIsHidden = null
function printResult() {
  const gTotalTime = performance.now()
  const resultStats = document.getElementById('resultStats')
  if (resultStats !== null) {
    if (gResultMesseage === null) {
      gResultMesseage = resultStats.innerHTML
    }
    const len = Object.keys(gFilterdResult).length
    resultStats.innerHTML = gResultMesseage + 'muted&nbsp;' + len + '&nbsp;items&nbsp;(' + (gTotalTime / 1000).toFixed(3) + 's) click to show muted items'
    resultStats.onclick = () => {
      if (gIsHidden === false) {
        hideFilterd()
      } else if (gIsHidden === true) {
        showFilterd()
      }
    }
  }
}
function hideFilterd() {
  for (let key of Object.keys(gFilterdResult)) {
    gFilterdResult[key].style.display = 'none'
    gIsHidden = true
  }
}
function showFilterd() {
  for (let key of Object.keys(gFilterdResult)) {
    gFilterdResult[key].style.borderStyle = 'dashed'
    gFilterdResult[key].style.borderColor = '#808080'
    gFilterdResult[key].style.display = 'block'
    gIsHidden = false
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
