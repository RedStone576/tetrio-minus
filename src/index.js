window.addEventListener("DOMContentLoaded", () => 
{
  if (window.location.pathname !== "/") return
 
  chrome.runtime.sendMessage({ i: "init:load" })
  
  chrome.storage.local.get(null, ({ config: storage }) =>
  {
    fetch(chrome.runtime.getURL("src/config.json"))
    .then(x => x.json())
    .then(x =>
    {
      for (const config of x.config)
      {
        if (Array.isArray(config.path) && storage[config.name]) 
        {
          for (const x of config.path)
          {
            inject(true, `/src/stuff${x}`)
          }
        
          continue
        }
      
        inject(storage[config.name], `/src/stuff${config.path}`)
      }
    })
  })
})

function inject(condition, path)
{
  if (!condition) return

  const file    = chrome.runtime.getURL(path)
  const element = document.head
  
  if (path.includes(".js"))
  {
    const script = document.createElement("script")
    
    script.setAttribute("type", "text/javascript")
    script.setAttribute("src", `${file}?${new URLSearchParams({ id: chrome.runtime.id })}`) //whacky but eh
  
    element.appendChild(script)
  }
  
  else if (path.includes(".css"))
  {
    const link = document.createElement("link")
    
    link.setAttribute("rel", "stylesheet")
    link.setAttribute("href", file)
    
    element.appendChild(link)
  }
}
