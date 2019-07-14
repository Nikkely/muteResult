function getYMD(dt) {
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth()+1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  return y + "/" + m + "/" + d;
}

chrome.storage.sync.get(null, items => {
  if (items.domain !== undefined) {
    for(let k of Object.keys(items.domain)) {
      let row = document.createElement('tr')

      let target = document.createElement('td')
      const faviconApi = 'http://www.google.com/s2/favicons?domain=' + k
      const k_ = k.length <= 30 ? k : k.slice(0, 27) + '...'
      target.innerHTML = '<img src="' + faviconApi + '" width="16" height="16"/><a href="' + k + '" target="_blank"> ' + k_ + '</a>'
      row.appendChild(target)

      let term = document.createElement('td')
      let termBtn = document.createElement('a')
      if (items.domain[k] === -1) {
        term.innerHTML = "<span>&infin;&nbsp;</span>"
        termBtn.textContent = 'a month'
      } else {
        term.innerHTML = "<span>" + getYMD(new Date(items.domain[k])) + "&nbsp;</span>"
        termBtn.textContent = 'extend a month'
      }
      termBtn.className = 'waves-effect waves-light btn'
      termBtn.onclick = () => {
        const date = items.domain[k] === -1 ? new Date() : new Date(items.domain[k])
        date.setMonth(date.getMonth() + 1)
        items.domain[k] = date.getTime()
        chrome.storage.sync.set(items, () => {
          location.reload() // めんどいので
        })
      }
      term.appendChild(termBtn)
      row.appendChild(term)

      let remove = document.createElement('td')
      let removeBtn = document.createElement('a')
      removeBtn.textContent = 'remove'
      removeBtn.className = 'waves-effect waves-light btn'
      removeBtn.onclick = () => {
        delete items.domain[k]
        chrome.storage.sync.set(items, () => {
          location.reload() // めんどいので
        })
      }
      remove.appendChild(removeBtn)
      row.appendChild(remove)

      document.getElementById('domainList').appendChild(row)
    }
  }

  if (items.pageURL !== undefined) {
    for(let k of Object.keys(items.pageURL)) {
      let row = document.createElement('tr')

      let target = document.createElement('td')
      const faviconApi = 'http://www.google.com/s2/favicons?domain=' + k
      const k_ = k.length <= 30 ? k : k.slice(0, 27) + '...'
      target.innerHTML = '<img src="' + faviconApi + '" width="16" height="16"/><a href="' + k + '" target="_blank"> ' + k_ + '</a>'
      row.appendChild(target)

      let term = document.createElement('td')
      // term.textContent = "&infin;"
      term.innerHTML = "&infin;"
      row.appendChild(term)

      let remove = document.createElement('td')
      let removeBtn = document.createElement('a')
      removeBtn.textContent = 'remove'
      removeBtn.className = 'waves-effect waves-light btn'
      removeBtn.onclick = () => {
        delete items.pageURL[k]
        chrome.storage.sync.set(items, () => {
          location.reload() // めんどいので
        })
      }
      remove.appendChild(removeBtn)
      row.appendChild(remove)

      document.getElementById('pageList').appendChild(row)
    }
  }
})
