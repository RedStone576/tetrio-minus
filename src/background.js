chrome.action.onClicked.addListener(() => chrome.tabs.create({ url: chrome.runtime.getURL("src/pages/config/index.html") }))

chrome.runtime.onMessage.addListener((req, send, res) => 
{ 
  if (req.i === "init:load") load()
})

function redirect(red, url, id)
{
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      id: id,
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
    
    removeRuleIds: [id]
  }, () => console.log(`rule ${id} with url ${url}`))
}

function load()
{
  fetch(chrome.runtime.getURL("src/config.json"))
  .then(x => x.json())
  .then(config =>
  {
    chrome.storage.local.get(null, (x) =>
    {
      for (const h of config.overwrite)
      {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [h.id + 1]
        })
      
        if (x[h.name]) redirect(x[h.name], h.url, h.id)
      }
    })
  })
}
