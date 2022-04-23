window.addEventListener("DOMContentLoaded", () => 
{
  fetch(chrome.runtime.getURL("config.json")).then(x => x.json()).then(config => 
  {
    function injectScript(file, node) 
    {
      const the = document.getElementsByTagName(node)[0]
      const h   = document.createElement("script")

      h.setAttribute("type", "text/javascript")
      h.setAttribute("src", file)
      the.appendChild(h)
    }

    !config.skin_connected ? void 0 : injectScript(chrome.extension.getURL("/source/connected.js"), "body")
    !config.custom_map     ? void 0 : injectScript(chrome.extension.getURL("/source/map.js"),       "body")
  })
})

