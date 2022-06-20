window.addEventListener("DOMContentLoaded", () => 
{
  chrome.storage.local.get(null, ({ config }) =>
  {
    !config["connected-skin"] || inject(chrome.extension.getURL("/source/connected.js"), "body")
    !config["custom-map"]     || inject(chrome.extension.getURL("/source/map.js"),       "body")
  })
})

function inject(file, node) 
{
  const the = document.getElementsByTagName(node)[0]
  const h   = document.createElement("script")

  h.setAttribute("type", "text/javascript")
  h.setAttribute("src", file)
  
  the.appendChild(h)
}
