window.addEventListener("DOMContentLoaded", () => {
  function injectScript(file, node) 
  {
    const the = document.getElementsByTagName(node)[0]
    const h   = document.createElement('script')

    h.setAttribute('type', 'text/javascript')
    h.setAttribute('src', file)
    the.appendChild(h)
  }

  injectScript(chrome.extension.getURL('/source/connected.js'), 'body')
  injectScript(chrome.extension.getURL('/source/map.js'),     'body')
})