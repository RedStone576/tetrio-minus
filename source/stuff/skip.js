let lgnAtt = 0 
let lgnInt = setInterval(() => 
{
  lgnAtt++
  
  if (lgnAtt > 20) return clearInterval(lgnInt)

  let doc = document.getElementsByClassName("flex-item flex-3x oob_button pri")[0]

  if (!!doc)
  {
    doc.click()
    clearInterval(lgnInt)
  }
}, 500)
