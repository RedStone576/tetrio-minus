{
  const id = new URLSearchParams(document.currentScript.src.split("?")[1]).get("id")

  let interval = setInterval(() => 
  {
    let doc = document.querySelectorAll('[title="Text displayed before starting game."]')[0]
  
    if (!!doc)
    {
      clearInterval(interval)
    
      doc.outerHTML = `
      <div class="room_config_row flex-row imp" title="Text displayed before starting game.">
        <div class="room_config_label flex-item ns">
          mission
        </div><input class="room_config_item flex-item" data-index="mission" value="CUSTOM GAME">
      </div>
      
      <div class="room_config_row flex-row imp" title="custom map">
        <a href="chrome-extension://${id}/src/pages/editor/index.html" target="_blank" class="room_config_label flex-item ns">
          map
        </a>
        
        <input class="room_config_item flex-item" data-index="map" value="">
      </div>`
    }
  }, 1000)
}
