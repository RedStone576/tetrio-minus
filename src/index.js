window.addEventListener("DOMContentLoaded", () => 
{
  if (window.location.pathname !== "/") return
  
  chrome.runtime.sendMessage({ i: "init:load" })
  
  chrome.storage.local.get(null, ({ config }) =>
  {
    inject(config["connected-skin"], "head", "/src/stuff/connected.js")
    inject(config["card"],           "head", "/src/stuff/card.js")
    inject(config["custom-map"],     "head", "/src/stuff/map.js",      { id: chrome.runtime.id })
    inject(config["bongocat"],       "head", "/src/stuff/bongocat.js", { id: chrome.runtime.id })
  })
})

function inject(condition, node, path, args) 
{
  if (!condition) return

  const element = document.getElementsByTagName(node)[0]
  const script  = document.createElement("script")
  const file    = chrome.runtime.getURL(path)
 
  script.setAttribute("type", "text/javascript")
  script.setAttribute("src", file + (!args ? "" : `?${new URLSearchParams(args)}`)) //whacky but eh

  element.appendChild(script)
  script.remove()
}
