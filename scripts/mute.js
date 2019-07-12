var gMuteList = new MuteList()

var gFilterdResultLength = 0
// var gObserver = new MutationObserver(() => {
//   filterDomain()
//   const frl = Object.keys(gFilterdResult).length
//   if (frl !== gFilterdResultLength) {
//     gObserver.disconnect()
//     gFilterdResultLength = frl
//     hideFilterd()
//     printResult()
//     gObserver.observe(document.documentElement, observeOptions)
//   }
// })
//
var observeOptions = {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: true
}
// gObserver.observe(document.documentElement, observeOptions);

document.addEventListener("DOMContentLoaded", e => {
  let observer = new MutationObserver(() => {
    filterDomain()
    const frl = Object.keys(gFilterdResult).length
    if (frl !== gFilterdResultLength) {
      observer.disconnect()
      gFilterdResultLength = frl
      hideFilterd()
      printResult()
      observer.observe(document.documentElement, observeOptions)
    }
  })
  observer.observe(document.documentElement, observeOptions)
})

var gFilterdResult = {}
function filterDomain() {
  const searchResultsDiv = document.getElementsByClassName('srg')[0] // 検索結果群
  if (!searchResultsDiv) return

  const searchResultDivs = searchResultsDiv.getElementsByClassName('g')
  for (let element of searchResultDivs) {
    const targetUrl = element.getElementsByTagName('a')[0].href
    const targetDomain = extractDomain(targetUrl)
    gMuteList.getFromDomainList(targetDomain, term => {
      element.style.display = 'none'
      gFilterdResult[targetUrl] = element
    })
    const pageURL = extractPageURL(targetUrl)
    gMuteList.getFromPageList(pageURL, term => {
      element.style.display = 'none'
      gFilterdResult[targetUrl] = element
    })
  }
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
