
function extractDomain(url) {
  let domain = null
  try {
    domain = url.match(/^https?:\/\/(.*?)(\/|\?|#|$)/)[1]
  } catch(e) {
    console.error('failed to extract domain from url');
    console.error(e);
  } finally {
    return domain
  }
}
function extractPageURL(url) { // フラグメント、クエリは除く
  let pageURL = null
  try {
    domain = url.match(/^https?:\/\/(.*?)(\?|#|$)/)[1]
  } catch(e) {
    console.error('failed to extract page url');
    console.error(e);
  } finally {
    return pageURL
  }
}

// ↓promise化しようかと思ったけどいまのところはいいや
var gMuteList = null // 全件とるなら次のアクセスに備えてキャッシュしてもいいかなと
function getAllMuteList(func = null) {
  chrome.storage.sync.get(null, all => {
    gStorage = all
    if (func !== null) func(all)
  })
}
function getMuteList(key, func = null) {
  if (key == null) {
    getAllMuteList(func)
    return
  }
  if (gStorage === null || gMuteList === undefined) {
    chrome.storage.sync.get(key, func)
  } else {
    func(gStorage[key])
  }
}
function setMuteList(obj, func = null) {
  if (gMuteList !== null) {
    for(let key of Object.keys(obj)) {
      gMuteList[key] = obj[key]
    }
  }
  chrome.storage.sync.set(obj, func)
}
