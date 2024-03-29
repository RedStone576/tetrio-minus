// i want to implement dropzone but later so imma comment this so i dont forgor

const $ = (x) => document.getElementById(x)

const template = (x, y, z) =>
`<div class="card" id="card-${y}">
    <h2>${x.toUpperCase()}</h2>
    <div class="buttons">
        <div class="button" id="reset-${y}">reset</div>
        <div class="button" id="button-${y}">upload new file</div>
    </div>
    <input type="file" id="selector-${y}" accept=".jpg, .jpeg, .png">			
    <br>${z}
</div>`

render()
function render(pos = 0)
{
  fetch(chrome.runtime.getURL("src/config.json"))
  .then(x => x.json())
  .then(config =>
  {
    chrome.storage.local.get(null, (x) =>
    {
      for (const h of config.config)
      {
        if (h.title[0] === "!") continue
        if ($(`toggle-${h.name}`)) $(`toggle-${h.name}`).remove()
        
        $("config").innerHTML += `<div id="toggle-${h.name}" class="${x?.config?.[h.name] ? "checkmark" : "notCheckmark"}" title="${h.info}">${h.title.toUpperCase()}</div>`
      }
    
      for (const h of config.overwrite)
      { 
        if ($(`card-${h.name}`)) $(`card-${h.name}`).remove()
      
        $("main").innerHTML += template(h.title, h.name, x[h.name] ? `<img style="max-width: 40%; max-height: 40%;" src="${x[h.name]}">` : "<p>no image selected</p>")
      }
      
      for (const h of config.config)
      {
        if (h.title[0] === "!") continue
      
        toggle(h.name, h.clash)
      }
      
      for (const h of config.overwrite) 
      { 
        if (h.title[0] === "!") continue
      
        click(h.name) 
        setData(h.name)
        resetData(h.name)
      }
      
      $("test").addEventListener("click", () => 
      {
        chrome.storage.local.clear()
            
        for (const z of Object.keys(__testdata))
        {
          if (z === "config") chrome.storage.local.set({ config: __testdata[z] })
          else chrome.storage.local.set({ [z]: __testdata[z] })
        }
            
        render()
      })
      
      $("export").addEventListener("click", () => 
      {
        chrome.storage.local.get(null, (x) => 
        {
          const h = document.createElement("a")
              
          h.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(x))}`)
          h.setAttribute("download", "tminusconfig.json")
          h.click()
        })
      })
      
      $("import").addEventListener("click", () =>
      {
        const h = document.createElement("input")
        
        h.setAttribute("type", "file")
        h.setAttribute("accept", "json")
        h.click()
      
        h.addEventListener("change", (x) => 
        {
          const reader = new FileReader()
          
          reader.readAsText(x.target.files[0])
          reader.onload = (y) => 
          {
            const json = JSON.parse(y.target.result)
            
            chrome.storage.local.clear()
            
            for (const z of Object.keys(json))
            {
              if (z === "config") chrome.storage.local.set({ config: json[z] })
              else chrome.storage.local.set({ [z]: json[z] })
            }
            
            render()
          }
        })
      })
    })
  })
  
  window.scrollTo(0, pos)
}

function toggle(x, clash)
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
        if (!h.config) h.config = {}
        
        h.config[x] = false
        chrome.storage.local.set({ config: h.config })
      })
    }
    
    else if (list.contains("notCheckmark"))
    {
      list.remove("notCheckmark")
      list.add("checkmark")
      
      chrome.storage.local.get("config", (h) => 
      {  
        if (!h.config) h.config = {}
        
        console.log(!!clash && !!h.config[clash] ? `enabled ${x} and disables ${clash}` : `enabled ${x}`)
        
        if (!!clash && !!h.config[clash]) 
        {
          const cl = $(`toggle-${clash}`).classList
          
          cl.remove("checkmark")
          cl.add("notCheckmark")
          
          h.config[clash] = false
        }
        
        h.config[x] = true 
        chrome.storage.local.set({ config: h.config })
      })
    }
  })
}

function setData(x)
{  
  $(`selector-${x}`).addEventListener("change", (z) => 
  {
    const reader = new FileReader()
  
    reader.readAsDataURL(z.target.files[0])
    reader.onload = () => 
    {
      chrome.storage.local.set({ [x]: reader.result })
    
      render(window.scrollY)
    }
  })
}

function resetData(x)
{
  $(`reset-${x}`).addEventListener("click", () =>
  {
    chrome.storage.local.remove(x)
  
    render(window.scrollY)
  })
}

function click(x)
{
  $(`button-${x}`).addEventListener("click", () => $(`selector-${x}`).click())
}
