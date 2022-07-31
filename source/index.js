window.addEventListener("DOMContentLoaded", () => 
{
  chrome.storage.local.get(null, ({ config }) =>
  {
    !config["connected-skin"] || inject("head", "/source/stuff/connected.js")
    !config["custom-map"]     || inject("head", "/source/stuff/map.js")
    !config["skip-login"]     || inject("head", "/source/stuff/skip.js")
    !config["bongocat"]       || inject("head", "/source/stuff/bongocat.js", { 1: chrome.runtime.getURL("../res/internal/cat1.png"), 2: chrome.runtime.getURL("../res/internal/cat2.png"), 3: chrome.runtime.getURL("../res/internal/cat3.png"), 4: chrome.runtime.getURL("../res/internal/cat4.png") })
  })
})

function inject(element, path, stuff) 
{
  const el = document.getElementsByTagName(element)[0]
  const se = document.createElement("script")
  const sf = chrome.runtime.getURL(path)
   
  if (!!stuff)
  {
    const nm = path.split("/")[path.split("/").length - 1].split(".")[0]
    const al = document.createElement("script")
    
    al.textContent = `const _${nm} = Object.freeze(${JSON.stringify(stuff)})`    
    el.appendChild(al)
  }

  se.setAttribute("type", "text/javascript")
  se.setAttribute("src",  sf)
  
  el.appendChild(se)
}
