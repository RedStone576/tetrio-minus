chrome.action.onClicked.addListener(() => chrome.tabs.create({ url: chrome.runtime.getURL("src/pages/config/index.html") }))

chrome.runtime.onMessage.addListener((req, send, res) => 
{ 
  console.log(req)

  if (req.i === "config:reload")
  {
    load()
    
    chrome.runtime.sendMessage({ i: "config:reloaded" })
  }
})

load()

chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [{
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: { 
      urlFilter: "https://tetr.io/res/skins/board/generic/queue.png", 
      domains: ["tetr.io"]
    }
  }],
  
  removeRuleIds: [1]
})

function redirect(red, url, id)
{
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      id: id + 1,
      priority: 1,
      action: { 
        type: "redirect",
        redirect: {
          url: red
        }
      },
  
      condition: { 
        urlFilter: url, 
        domains: ["tetr.io"],
        resourceTypes: ["image"]
      }
    }],
    
    removeRuleIds: [id + 1]
  }, () => console.log(`rule ${id + 1} with url ${url}`))
}

function load()
{
  fetch(chrome.runtime.getURL("src/config.json"))
  .then(x => x.json())
  .then(config =>
  {
    chrome.storage.local.get(null, (x) =>
    {
      for (const h of config.things)
      {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [h.id + 1]
        })
      
        if (x[h.name]) redirect(x[h.name], h.url, h.id)
      }
    })
  })
}
