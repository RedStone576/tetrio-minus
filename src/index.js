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
        inject(storage[config.name], `/src/stuff${config.path}`, { id: chrome.runtime.id })
      }
    })
  })
})

function inject(condition, path, args)
{
  if (!condition) return

  const file    = chrome.runtime.getURL(path)
  const element = document.head
  
  if (path.includes(".js"))
  {
    const script = document.createElement("script")
    
    script.setAttribute("type", "text/javascript")
    script.setAttribute("src", file + (!args ? "" : `?${new URLSearchParams(args)}`)) //whacky but eh
  
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
