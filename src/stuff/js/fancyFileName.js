{
  // probably easier by just modifying tetrio.js lol

  let interval = setInterval(() => 
  {
    let element = document.getElementById("downloadreplay_results")
  
    if (!!element)
    {
      clearInterval(interval)
    
      element.addEventListener("click", (e) =>
      {
        const _appendChild = document.body.appendChild // save the original refrence

        // hijack the function
        document.body.appendChild = (x) =>
        {
          document.body.appendChild = _appendChild // make sure to only do it for this certain element
          //console.log(x)

          const info = getSingleReplay(x.download)
          
          //x.download = `${info.date}_${info.player}_${info.gamemode}_${info.score}.${info.type}`
          x.download = `${info.player} (${info.gamemode}) ${info.score}${info.gamemode === "custom" ? (" " + info.date) : ""}.${info.type}`
          return _appendChild.call(document.body, x)
        }
      })
    }
  }, 1000)

  let interval2 = setInterval(() => 
  {
    let element = document.getElementById("downloadreplay_multilog")
  
    if (!!element)
    {
      clearInterval(interval2)

      element.addEventListener("click", (e) =>
      {
        const _appendChild = document.body.appendChild
        
        document.body.appendChild = (x) =>
        {
          document.body.appendChild = _appendChild

          const info = getMultiReplay()

          x.download = `${info.player} (${info.player_score}) vs (${info.opponent_score}) ${info.opponent}.ttrm`
          return _appendChild.call(document.body, x)
        }
      })
    }
  }, 1000)

  const singleGamemodes = {
    "40": "sprint",
    "BLITZ": "blitz",
    "CUSTOM": "custom"
  }

  // types of replay if the name wasn't clear enough
  function getSingleReplay(file)
  {
    // ye im not sure
  
    // 14-05-23_redstone576_40l_0-26-752.ttr
    // 14-05-23_redstone576_blitz_528-051.ttr

    // redstone576 (blitz) 528-051 14-05-23.ttr
    // redstone576 (sprint) 0-26-752 14-05-23.ttr
    
    const footer = document.getElementById("footer_text").textContent
    const type   = file.split(".")[1]
    
    const gamemode = singleGamemodes[footer.split(" ")[0]] // 40l | blitz | custom
    const score    = document.getElementById("result_result").textContent.replaceAll(",", "-").replaceAll(".", "-").replaceAll(":", "-") // whatever the endscore title display
    const player   = footer.split(" ")[gamemode === "blitz" ? 3 : 4].toLowerCase()
    const date     = footer.split(" ")[gamemode === "blitz" ? 5 : 6].replaceAll(",", "").replaceAll("/", "-") 

    return { type, gamemode, score, player, date }
  }

  function getMultiReplay()
  {
    // 14-05-23_redstone576_vs_redstone576_0-7.ttrm
    // redstone576_(7)_vs_(0)_redstone576.ttrm

    // havent try this on tl end screen 
    const gamemode       = "" // tl | custom
    const player         = document.querySelectorAll(".leagueplayer_name")[0].textContent.toLowerCase()
    const player_score   = document.querySelectorAll(".leagueplayer_count")[0].textContent
    const opponent       = document.querySelectorAll(".leagueplayer_name")[1].textContent.toLowerCase()
    const opponent_score = document.querySelectorAll(".leagueplayer_count")[1].textContent
    const date           = document.getElementById("footer_text").textContent.split("played on ")[1].split(" ")[0].replace(",", "").replaceAll("/", "-")
  
    return { gamemode, player, player_score, opponent, opponent_score, date }
  }
}
