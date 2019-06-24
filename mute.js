
function mute() {
  console.log('mute');
  var searchResultDiv = document.getElementsByClassName('g');
  Array.prototype.forEach.call(searchResultDiv, function(item) {
    item.parentNode.removeChild(item);
  });
}


var observer = new MutationObserver(mute);

observer.observe(document.getElementById('ires'), {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
});
