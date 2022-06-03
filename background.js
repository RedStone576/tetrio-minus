chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({ url: chrome.extension.getURL("source/dashboard/dashboard.html") }))

chrome.webRequest.onBeforeRequest.addListener(x => 
{
  if (x.url !== "https://tetr.io/tetrio.js") return { redirectUrl: chrome.runtime.getURL("source/colors.js") }
}
,{ urls: ["https://tetr.io/js/tetrio.js*"] }
,["blocking"])

function redirect(x, y)
{
  chrome.webRequest.onBeforeRequest.addListener(() => 
  { 
    return { redirectUrl: x }
  }
  ,{ urls: [y] }
  ,["blocking"])
}

fetch(chrome.runtime.getURL("config.json")).then(x => x.json()).then(config =>
{
  chrome.storage.local.get(null, (x) =>
  {
    for (const h of config.things)
    {
      if (x[h.name]) redirect(x[h.name], h.url)
    }
  })
})

chrome.webRequest.onBeforeRequest.addListener(() => { return { cancel: true}}, {urls: ["https://tetr.io/res/skins/board/generic/queue.png"]}, ["blocking"])
