{
  let interval = setInterval(() => 
  {
    let doc = document.getElementsByClassName("flex-item flex-3x oob_button pri")[0]
  
    if (!!doc)
    {
      doc.click()
      clearInterval(interval)
    }
  }, 1000)
}
