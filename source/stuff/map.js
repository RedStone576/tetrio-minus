let mapAtt = 0
let mapInt = setInterval(() => 
{
  mapAtt++
  
  if (mapAtt > 15) return clearInterval(mapInt)

  let doc = document.querySelectorAll('[title="Text displayed before starting game."]')[0]

  if (!!doc)
  {
    doc.outerHTML = `<div class="room_config_row flex-row imp" title="Text displayed before starting game."><div class="room_config_label flex-item ns">mission</div><input class="room_config_item flex-item" data-index="mission" value="CUSTOM GAME"></div><div class="room_config_row flex-row imp" title="custom map"><a href="https://you.have.fail/ed/at/tetrio/mapeditor/" target="_blank" class="room_config_label flex-item ns">map</a><input class="room_config_item flex-item" data-index="map" value=""></div>`
    clearInterval(mapInt)
  }
}, 1000)
