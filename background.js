chrome.webRequest.onBeforeRequest.addListener(details => 
{
  if (details.url !== "https://tetr.io/tetrio.js") 
  {
    return { redirectUrl: chrome.runtime.getURL("source/colors.js")}
  }
}, { urls: ["*://tetr.io/js/tetrio.js*"] }, ["blocking"])

chrome.webRequest.onBeforeRequest.addListener(() => { return { redirectUrl: chrome.runtime.getURL("res/user/skin.connected.mino.png")}}, {urls: ["https://tetr.io/res/skins/minos/connected.png"]}, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(() => { return { redirectUrl: chrome.runtime.getURL("res/user/skin.connected.ghost.png")}}, {urls: ["https://tetr.io/res/skins/ghost/connected.png"]}, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(() => { return { redirectUrl: chrome.runtime.getURL("res/user/skin.board.png")}}, {urls: ["https://tetr.io/res/skins/board/generic/board.png"]}, ["blocking"])
chrome.webRequest.onBeforeRequest.addListener(() => { return { cancel: true}}, {urls: ["https://tetr.io/res/skins/board/generic/queue.png"]}, ["blocking"])
