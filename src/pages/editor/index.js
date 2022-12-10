const $ = x => document.getElementById(x)

const colors = Object.freeze({
  "Z": "#b5353b",
  "L": "#b96737", 
  "O": "#b89e36",
  "S": "#84b434",
  "I": "#34b585",
  "J": "#5240a6",
  "T": "#a6409c",
  "G": "#4b4b4b",
  "D": "#222222",
  "E": "#283145"
})

const colorsKeys = Object.keys(colors)

let mapWidth     = 0
let mapString    = ""
let lastPosition = []
let currentPiece = "J"
let counter      = 0
let clicked      = false

board($("board"), 50, 100)

function board(node, height, width, map)
{
  node      = node
  height    = height ? (height > 100 ? 100 : height) : 40
  width     = width  ? (width  > 100 ? 100 : width)  : 10
  mapString = map ? (map.length === height * width ? map : map + ((height * width) - "_".repeat(map.length))) : "_".repeat(height * width)
  mapWidth  = width 
 
  node.innerHTML = ""
  
  for (let y = 0; y < height; y++)
  {
    const divHeight = document.createElement("div")
    divHeight.setAttribute("id", `row-${y}`)
  
    for (let x = 0; x < width; x++)
    {
      const divWidth = document.createElement("div")
      divWidth.setAttribute("id", `column-${x}-${y}`)

      divWidth.addEventListener("mouseover", () => shadow(x, y))
      divWidth.addEventListener("mouseout", () => shadow(x, y, true))
      divWidth.addEventListener("click", () => draw(x, y, true))
    
      divHeight.appendChild(divWidth)
    }
  
    node.appendChild(divHeight)
  }
}

function shadow(x, y, r)
{
  if (clicked) draw(x, y)

  const element = $(`column-${x}-${y}`)
  lastPosition  = [x, y]
  
  element.style.cssText = r ? " " : `background: ${colors[currentPiece]}; border: solid 1px white;`
}

function draw(x, y, r)
{
  
  const element = $(`column-${x}-${y}`)
  
  element.className = ""
  element.classList.add(`tile-${currentPiece}`)
  
  const mapArray = mapString.match(new RegExp(`.{1,${mapWidth}}`, "g"))
  
  const c = currentPiece
  .replace("D", "@")
  .replace("G", "#")
  .replace("E", "_")
  
  mapArray[y] = mapArray[y].substring(0, x) + c + mapArray[y].substring(x + 1)
  mapString   = mapArray.join("")
  
  console.log(mapString)
}

$("board").addEventListener("mousewheel", (e) =>
{
  e.deltaY > 0 ? counter++ : counter--
  counter = counter > colorsKeys.length - 1 ? 0 : counter
  counter = counter < 0 ? colorsKeys.length - 1 : counter
  
  currentPiece = colorsKeys[counter]
  shadow(lastPosition[0], lastPosition[1])
})

document.body.addEventListener("mousedown", () => clicked = true)
document.body.addEventListener("mouseup", () => { if (clicked) clicked = false })
