let connectedAtt = 0
let connectedInt = setInterval(() => 
{
  connectedAtt++
  
  if (connectedAtt > 15) return clearInterval(connectedInt)

  if (!!window.DEVHOOK_CONNECTED_SKIN)
  {
    window.DEVHOOK_CONNECTED_SKIN()
    clearInterval(connectedInt)
  }
}, 1000)
