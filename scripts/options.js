chrome.storage.sync.get(null, items => {
  if (items.domain !== undefined) {
    for(let k of Object.keys(items.domain)) {
      let row = document.createElement('tr')

      let target = document.createElement('td')
      target.textContent = k
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
      target.textContent = k
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
