const $ = (x) => document.getElementById(x)
const reader = new FileReader()

function setData(x)
{  
  $(`selector-${x}`).addEventListener("change", (z) => 
  {
    reader.readAsDataURL(z.target.files[0])
    reader.onload = () => chrome.storage.local.set({ [x]: reader.result })
    
    window.location.reload()
  })
}

function toggle(x)
{
  $(`toggle-${x}`).addEventListener("click", () => 
  {
    const list = $(`toggle-${x}`).classList
    
    if (list.contains("checkmark"))
    {
      list.remove("checkmark")
      list.add("notCheckmark")
    
      console.log(`disabled ${x}`)
      
      chrome.storage.local.get("config", (h) => 
      {
        h.config[x] = false
      
        chrome.storage.local.set({ config: h.config })
      })
    }
    
    else if (list.contains("notCheckmark"))
    {
      list.remove("notCheckmark")
      list.add("checkmark")
      
      console.log(`enabled ${x}`)
      
      chrome.storage.local.get("config", (h) => 
      {
        h.config[x] = true
      
        chrome.storage.local.set({ config: h.config })
      })
    }
  })
}

function click(x)
{
  $(`button-${x}`).addEventListener("click", () => $(`selector-${x}`).click())
}

const template = (x, y, z) =>
`
<div class="card">
    <h2>${x.toUpperCase()}</h2>
    
    <div class="button" id="button-${y}">upload new file</div>
    <input type="file" id="selector-${y}" accept=".jpg, .jpeg, .png">			
    <br>${z}
</div>`

fetch(chrome.runtime.getURL("config.json")).then(x => x.json()).then(config =>
{
  chrome.storage.local.get(null, (x) =>
  {
    for (const h of config.config)
    {
      $("config").innerHTML += `<div id="toggle-${h.name}" class="${x?.config?.[h.name] ? "checkmark" : "notCheckmark"}">${h.title.toUpperCase()}</div>`
    }
  
    for (const h of config.things)
    { 
      $("main").innerHTML += template(h.title, h.name, x[h.name] ? `<img style="max-width: 40%; max-height: 40%;" src="${x[h.name]}">` : "<p>no image selected</p>")
    }
    
    for (const h of config.config)
    {
      toggle(h.name)
    }
    
    for (const h of config.things) 
    { 
      click(h.name) 
      setData(h.name)
    }
  })
})
