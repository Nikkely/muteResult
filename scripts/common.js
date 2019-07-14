
function extractDomain(url) {
  let domain = null
  try {
    domain = url.match(/^https?:\/\/(.*?)(\/|\?|#|$)/)[0]
  } catch(e) {
    console.error('failed to extract domain from url=' + url);
    console.error(e);
  } finally {
    return domain
  }
}
function extractPageURL(url) { // フラグメント、クエリは除く
  let pageURL = null
  try {
    pageURL = url.match(/^https?:\/\/(.*?)(\?|#|$)/)[0]
  } catch(e) {
    console.error('failed to extract page url=' + url);
    console.error(e);
  } finally {
    return pageURL
  }
}

/*
 * keys: domainList(array) pageList(array)
 * domainList {
 *  domain: term
 * }
 *
 * pageList {
 *  pageURL: term
 * }
 *
 * */
// ↓callback hell 最高！
class MuteList {
  constructor() {
    this.domainList = null
    this.pageList = null
    this.getAllMuteList()
  }

  getAllMuteList() {
    chrome.storage.sync.get('domain', list => {
      this.domainList = list.domain === undefined ? null : list.domain
    })
    chrome.storage.sync.get('pageURL', list  => {
      this.pageList = list.pageURL === undefined ? null : list.pageURL
    })
  }

  getFromDomainList(domain, clbk) {
    if (this.domainList === null) {
      chrome.storage.sync.get('domain', list => {
        if (list.domain === undefined) return
        this.domainList = list.domain
        const term = this.domainList[domain]
        if (term !== undefined) clbk(term)
      })
    } else {
      if (this.domainList[domain] !== undefined) clbk(this.domainList[domain])
    }
  }

  getFromPageList(pageURL, clbk) {
    if (this.pageList === null) {
      chrome.storage.sync.get('pageURL', list => {
        if (list.pageURL === undefined) return
        this.pageList = list.pageURL
        const term = list.pageURL[pageURL]
        if (term !== undefined) clbk(term)
      })
    } else {
      if (this.pageList[pageURL] !== undefined) clbk(this.pageList[pageURL])
    }
  }

  setDomain(domain, term, clbk = null) {
    if (this.domainList !== null) {
      this.domainList[domain] = term
    }
    chrome.storage.sync.get('domain', list => {
      let obj = list.domain === undefined ? {} : list.domain
      obj[domain] = term
      chrome.storage.sync.set({domain: obj}, addedList => {
        if (clbk !== null) clbk(addedList.domain[domain])
      })
    })
  }

  setPageURL(url, term, clbk = null) {
    if (this.pageList !== null) {
      this.pageList[url] = term
    }
    chrome.storage.sync.get('pageURL', list => {
      let obj = list.pageURL === undefined ? {} : list.pageURL
      obj[url] = term
      chrome.storage.sync.set({pageURL: obj}, addedList => {
        if (clbk !== null) clbk(addedList.pageURL[url])
      })
    })
  }
}
