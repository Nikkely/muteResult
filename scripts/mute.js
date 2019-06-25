
function mute() {
  var searchResultDiv = document.getElementsByClassName('g');
  Array.prototype.forEach.call(searchResultDiv, function(item) {
    result = item.getElementsByTagName('a')[0].href
    if (muteList[result] != undefined) {
      item.parentNode.removeChild(item);
    }
  });
}

var muteList = {}
chrome.storage.sync.get(null, function(item) {
  muteList = item
})

var observer = new MutationObserver(mute);

observer.observe(document.getElementById('ires'), {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
});
