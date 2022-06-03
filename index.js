window.addEventListener("DOMContentLoaded", () => 
{
  chrome.storage.local.get(null, ({ config }) =>
  {
    !config["connected-skin"] || injectScript(chrome.extension.getURL("/source/connected.js"), "body")
    !config["custom-map"]     || injectScript(chrome.extension.getURL("/source/map.js"),       "body")
  })
})

function injectScript(file, node) 
{
  const the = document.getElementsByTagName(node)[0]
  const h   = document.createElement("script")

  h.setAttribute("type", "text/javascript")
  h.setAttribute("src", file)
  
  the.appendChild(h)
}
