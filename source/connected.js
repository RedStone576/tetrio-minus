function connected() 
{
  let h = setInterval(() => {
    if (!!window.DEVHOOK_CONNECTED_SKIN)
    {
      window.DEVHOOK_CONNECTED_SKIN()
      clearInterval(h)
    }
  }, 1000)
} 

connected()