{
  const bongoContainer = document.createElement("div")
  const css            = document.createElement("style")
  
  bongoContainer.setAttribute("id", "bongoContainer")
  bongoContainer.className = "bongoContainer cat1 ns" 
  
  document.body.append(bongoContainer)
      
  css.textContent = 
  `.bongoContainer {
    position: fixed;
    cursor: move;
    z-index: 100000000000;
    width: 50%;
    height: 25%; 
    background-size: contain;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  
  .cat1 {
    background-image: url('${_bongocat[1]}');
  }
  
  .cat2 {
    background-image: url('${_bongocat[2]}');
  }
  
  .cat3 {
    background-image: url('${_bongocat[3]}');
  }
  
  .cat4 {
    background-image: url('${_bongocat[4]}');
  }
  
  .ns {
      -webkit-touch-callout: none;
        -webkit-user-select: none; 
        -khtml-user-select: none; 
          -moz-user-select: none; 
            -ms-user-select: none; 
                user-select: none; 
  }`
  
  document.head.append(css)
  
  const ctrl = {
    custom: JSON.parse(localStorage.userConfig).controls.custom,
    
    guideline: 
    {
      openSocial  : [ "TAB"                                                                ],
      exit        : [ "ESCAPE"                                                             ],
      rotate180   : [ "A",          "KEYA"                                                 ],
      hardDrop    : [ "SPACE",      "NUMPAD8"                                              ],
      retry       : [ "R",          "KEYR"                                                 ],
      chat        : [ "T",          "KEYT"                                                 ],
      target1     : [ "1",          "DIGIT1"                                               ],
      target2     : [ "2",          "DIGIT2"                                               ],
      target3     : [ "3",          "DIGIT3"                                               ],
      target4     : [ "4",          "DIGIT4"                                               ],
      menuConfirm : [ "ENTER",      "NUMPADENTER", "SPACE"                                 ],
      moveLeft    : [ "ARROWLEFT",  "LEFT",        "NUMPAD4"                               ],
      moveRight   : [ "ARROWRIGHT", "RIGHT",       "NUMPAD6"                               ],
      softDrop    : [ "ARROWDOWN",  "DOWN",        "NUMPAD2"                               ],
      rotateCCW   : [ "CONTROL",    "CONTROLLEFT", "KEYZ", "NUMPAD3", "NUMPAD7"            ],
      rotateCW    : [ "ARROWUP",    "UP",          "KEYX", "NUMPAD1", "NUMPAD5", "NUMPAD9" ],
      hold        : [ "SHIFT",      "SHIFTLEFT",   "KEYC", "NUMPAD0"                       ],
    },
    
    wasd:   
    { 
      openSocial  : [ "TAB"                                      ],
      exit        : [ "ESCAPE"                                   ],
      retry       : [ "R",          "KEYR"                       ],
      chat        : [ "T",          "KEYT"                       ],
      menuBack    : [ "ESCAPE",     "BACKSPACE"                  ],
      target1     : [ "1",          "DIGIT1"                     ],
      target2     : [ "2",          "DIGIT2"                     ],
      target3     : [ "3",          "DIGIT3"                     ],
      target4     : [ "4",          "DIGIT4"                     ],
      menuConfirm : [ "ENTER",      "NUMPADENTER", "SPACE"       ],
      moveLeft    : [ "A",          "KEYA",        "NUMPAD4"     ],
      moveRight   : [ "D",          "KEYD",        "NUMPAD6"     ],
      softDrop    : [ "W",          "KEYW",        "NUMPAD8"     ],
      hardDrop    : [ "S",          "KEYS",        "NUMPAD5"     ],
      rotateCCW   : [ "ARROWLEFT",  "LEFT",        "NUMPAD7"     ],
      rotateCW    : [ "ARROWRIGHT", "RIGHT",       "NUMPAD9"     ],
      rotate180   : [ "ARROWUP",    "UP",          "NUMPAD2"     ],
      hold        : [ "SHIFT",      "SHIFTLEFT",   "NUMPADENTER" ],
    }
  }
  
  const ctrls = {
    "moveLeft"    : 2, "moveRight" : 2,
    "softDrop"    : 2, "hardDrop"  : 2,
    "rotateCCW"   : 3, "rotateCW"  : 3,
    "rotate180"   : 3, "hold"      : 3,
    "target1"     : 2, "target2"   : 2,
    "target3"     : 3, "target4"   : 3,
    "menuConfirm" : 4, "menuBack"  : 4,
  }
  
  let mapped = {}
  for (const x of Object.keys(ctrl[JSON.parse(localStorage.userConfig).controls.style]))
  {
    for (const y of ctrl[JSON.parse(localStorage.userConfig).controls.style][x])
    {
      if (y === null || y === "") continue
      mapped[y] = x
    }
  }
  
  const element   = document.getElementById("bongoContainer")
  const cordinate = localStorage.getItem("bongoCordinate")?.split(",") ?? [0, 0]
  
  element.style.width = "25%"
  element.style.left  = `${cordinate[0]}px`
  element.style.top   = `${cordinate[1]}px`
  
  let pressedKeys = {}
  document.onkeydown = (e) => 
  { 
    const n = ctrls[mapped[e.code.toUpperCase()]] ?? -1
  
    pressedKeys[n]    = e.type === "keydown" 
    element.className = `bongoContainer cat${e.type === "keydown" && pressedKeys[2] && pressedKeys[3] ? 4 : (ctrls[mapped[e.code.toUpperCase()]] ?? 1)} ns`
    pressedKeys       = Object.keys(pressedKeys).length > 1 ? {} : pressedKeys
  }
  
  document.onkeyup = (e) => 
  {
    element.className = "bongoContainer cat1 ns" 
    pressedKeys       = {}
  }
  
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0
  
  element.onmousedown = (e) =>
  {
    pos3 = e.clientX
    pos4 = e.clientY
    
    element.onmouseup = () =>
    {
      document.onmouseup   = null
      document.onmousemove = null
      
      localStorage.setItem("bongoCordinate", `${element.offsetLeft},${element.offsetTop}`)
    }
    
    document.onmousemove = (e) =>
    {
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      
      pos3 = e.clientX
      pos4 = e.clientY
  
      element.style.top  = `${element.offsetTop  - pos2}px`
      element.style.left = `${element.offsetLeft - pos1}px`
    }
  }
}
