load()

chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({ url: chrome.extension.getURL("source/page/dashboard.html") }))
chrome.runtime.onMessage.addListener((x, y, z) => 
{ 
  if (x.i === "urmom") 
  { 
    load()
    z({ i: "loaded" })    
  } 
  
  return true
})

chrome.webRequest.onBeforeRequest.addListener(() => 
{ 
  return { cancel: true }
}, 
{ urls: ["https://tetr.io/res/skins/board/generic/queue.png"] }, 
["blocking"])



function redirect(x, y)
{
  chrome.webRequest.onBeforeRequest.addListener(() => 
  { 
    return { redirectUrl: x }
  }, 
  { urls: [y] }, 
  ["blocking"])
}

function load()
{
  fetch(chrome.runtime.getURL("config.json"))
  .then(x => x.json())
  .then(config =>
  {
    chrome.storage.local.get(null, (x) =>
    {
      for (const h of config.things)
      {
        if (x[h.name]) redirect(x[h.name], h.url)
      }
    })
  })
}
