{
  let interval = setInterval(() => 
  {
    if (!!window.DEVHOOK_CONNECTED_SKIN)
    {
      window.DEVHOOK_CONNECTED_SKIN()
      clearInterval(interval)
    }
  }, 1000)
}
