window.addEventListener("DOMContentLoaded", () => 
{
  chrome.storage.local.get(null, ({ config }) =>
  {
    !config["connected-skin"] || inject("head", "/source/stuff/connected.js")
    !config["custom-map"]     || inject("head", "/source/stuff/map.js")
  })
})

function inject(element, path) 
{
  const e = document.getElementsByTagName(element)[0]
  const h = document.createElement("script")
  const f = chrome.extension.getURL(path)

  h.setAttribute("type", "text/javascript")
  h.setAttribute("src", f)
  
  e.appendChild(h)
}
