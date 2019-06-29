chrome.storage.sync.get(null, function(items) {
  for(let k of Object.keys(items)) {
    console.log('add');
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
    remove.onclick = function() {
      chrome.storage.sync.remove(k, function() {
        window.alert(k + "\nhas been removed")
        location.reload() // めんどいので
      })
    }
    row.appendChild(remove)

    document.getElementById('list').appendChild(row)
  }
})
