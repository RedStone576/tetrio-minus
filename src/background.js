chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [{
    id: 10,
    priority: 1,
    action: { type: "block" },
    condition: { 
      urlFilter: "https://tetr.io/res/skins/board/generic/queue.png", 
      domains: ["tetr.io"]
    }
  }],
  
  removeRuleIds: [10]
})

chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [{
    id: 11,
    priority: 1,
    action: { 
      type: "redirect",
      redirect: {
        url: chrome.runtime.getURL("../res/internal/skin.png")
      }
    },
    
    condition: { 
      urlFilter: "https://tetr.io/res/skins/minos/tetrio.png", 
      domains: ["tetr.io"],
      resourceTypes: ["image"]
    }
  }],
  
  removeRuleIds: [11]
})

