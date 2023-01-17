const $ = (x) => document.querySelector(x)

let current     = "z"
let mapString   = ""
let queueString = ""

let draggin = false
let balls   = 0

let width  = 40
let height = 10

const params = new URLSearchParams(window.location.search)

if (params.get("w") && params.get("h"))
{
  width  = Number(params.get("w") ?? 10)
  height = Number(params.get("h") ?? 40)
  
  $("#init").style.cssText = "display: none;"
  $("#main").style.cssText = ""

  init()
}

$("#idn").addEventListener("click", () =>
{
  width  = $("#width").value  ?? 10
  height = $("#height").value ?? 40

  $("#init").style.cssText = "display: none;"
  $("#main").style.cssText = ""

  init()
})

function init()
{
  const board = $(".board")
  
  mapString         = "_".repeat(height * width)
  board.innerHTML   = ""
  $("#map").value   = mapString
  $("#queue").value = ""

  current = "z"
  $("#picker-z").style.cssText = "background: var(--block-z); box-shadow: inset 0px 0px 0px 5px #e2e2e2"

  for (let x = 0; x < width; x++)
  {
    const rows = document.createElement("div")
    rows.setAttribute("id", `row-${x}`)
  
    for (let y = 0; y < height; y++)
    {
      const columns = document.createElement("div")
      
      columns.setAttribute("id", `column-${y}-${x}`)
      
      columns.addEventListener("mouseover", () => shadow(x, y))
      columns.addEventListener("mouseout", () => shadow(x, y, true))
      columns.addEventListener("click", () => draw(x, y))
      
      rows.appendChild(columns)
    }
  
    board.appendChild(rows)
  }
  
  $(".board").addEventListener("mousedown", () => draggin = true)
  $(".board").addEventListener("mouseup", () => draggin = false)
  $(".board").addEventListener("mouseleave", () => draggin = false)
  
  $("#queue").addEventListener("input", (e) => 
  {
    const { data } = e
    
    const filter = ["z", "l", "o", "s", "i", "j", "t", "?"]
    
    let h = $("#queue").value
    let j = h.split("").filter(x => filter.indexOf(x.toLowerCase()) > -1).join("")
    
    if (j.split("?").length > 2)
    {
      const s = j.split("?")
      
      j = [s[0], s[1]].join("?")
    }
    
    queueString       = j
    $("#queue").value = j.toUpperCase()
    
    $("#map").value = mapString + (queueString ? "?" : "") + queueString.toUpperCase()
  })
  
  $("#map").addEventListener("input", (e) => 
  {
    const { data } = e
    
    const filter = ["z", "l", "o", "s", "i", "j", "t", "#", "@", "_", "?"]
  
    let h = $("#map").value.split("?")
    let j = h[0].split("").filter(x => filter.indexOf(x.toLowerCase()) > -1).join("")
    let k = h.slice(1).join("?")
    
    if (k.split("?").length > 2)
    {
      const s = k.split("?")
      
      k = [s[0], s[1]].join("?")
    }
    
    mapString   = j.toUpperCase()
    queueString = k.toUpperCase()
    
    $("#queue").value = queueString
    $("#map").value   = mapString + (queueString ? "?" : "") + queueString
    
    const mapArray = mapString.match(new RegExp(`.{1,${width}}`, "g"))
    
    if (!mapArray) 
    {
      init()
    
      return
    }
      
    for (let y = 0; y < height; y++)
    {
      for (let x = 0; x < width; x++)
      {
        if (!mapArray?.[y]?.[x]) return
      
        const element = $(`#column-${y}-${x}`)
        
        element.className = ""
        element.classList.add(`tile-${mapArray[y][x].toLowerCase().replace("d", "@").replace("g", "#").replace("e", "_")}`)
      }
    }
  })
}

function shadow(x, y, r)
{
  if (draggin) return draw(x, y)

  const element = $(`#column-${y}-${x}`)
  
  element.style.cssText = r ? "" : `background: var(--block-${current});`
}

function draw(x, y, r)
{
  if (balls < 16)
  {
    balls++
  }
  
  if (balls === 15)
  {
    window.onbeforeunload = (e) =>
    {
      event.preventDefault()
      
      return event
    }
  }

  const element = $(`#column-${y}-${x}`)
  
  element.className = ""
  element.classList.add(`tile-${current}`)
  
  const mapArray = mapString.match(new RegExp(`.{1,${width}}`, "g"))
  
  const c = current
  .replace("d", "@")
  .replace("g", "#")
  .replace("e", "_")
  .toUpperCase()
  
  mapArray[y] = mapArray[y].substring(0, x) + c + mapArray[y].substring(x + 1)
  mapString   = mapArray.join("")
  
  $("#map").value = mapString + (queueString ? "?" : "") + queueString.toUpperCase()
}

$("#picker-z").addEventListener("click", () => setCurrent("z"))
$("#picker-l").addEventListener("click", () => setCurrent("l"))
$("#picker-o").addEventListener("click", () => setCurrent("o"))
$("#picker-s").addEventListener("click", () => setCurrent("s"))
$("#picker-i").addEventListener("click", () => setCurrent("i"))
$("#picker-j").addEventListener("click", () => setCurrent("j"))
$("#picker-t").addEventListener("click", () => setCurrent("t"))

function setCurrent(p)
{
  current = p
  
  for (const x of ["z", "l", "o", "s", "i", "j", "t", "g", "d", "e"])
  {
    if (p === x) 
    {
      $(`#picker-${p}`).style.cssText = `background: var(--block-${p}); box-shadow: inset 0px 0px 0px 5px #e2e2e2`
    
      continue
    }
  
    $(`#picker-${x}`).style.cssText = `background: var(--block-${x});`
  }
  
  console.log(current)
}
