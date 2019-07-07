chrome.storage.sync.get(null, items => {
  if (items.domain !== undefined) {
    for(let k of Object.keys(items.domain)) {
      var row = document.createElement('tr')

      var target = document.createElement('td')
      target.textContent = k
      row.appendChild(target)

      var term = document.createElement('td')
      // term.textContent = "&infin;"
      term.innerHTML = "&infin;"
      row.appendChild(term)

      var remove = document.createElement('td')
      // remove.textContent = "no way to remove"
      remove.innerHTML = '<a href="">remove</a>'
      remove.onclick = () => {
        delete items.domain[k]
        chrome.storage.sync.set(items, () => {
          window.alert(k + "\nhas been removed")
          location.reload() // めんどいので
        })
      }
      row.appendChild(remove)

      document.getElementById('domainList').appendChild(row)
    }
  }

  if (items.pageURL !== undefined) {
    for(let k of Object.keys(items.pageURL)) {
      var row = document.createElement('tr')

      var target = document.createElement('td')
      target.textContent = k
      row.appendChild(target)

      var term = document.createElement('td')
      // term.textContent = "&infin;"
      term.innerHTML = "&infin;"
      row.appendChild(term)

      var remove = document.createElement('td')
      // remove.textContent = "no way to remove"
      remove.innerHTML = '<a href="">remove</a>'
      remove.onclick = () => {
        delete items.pageList[k]
        chrome.storage.sync.set(items, () => {
          window.alert(k + "\nhas been removed")
          location.reload() // めんどいので
        })
      }
      row.appendChild(remove)

      document.getElementById('pageList').appendChild(row)
    }
  }
})
