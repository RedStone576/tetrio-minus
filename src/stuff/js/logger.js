{
  // for some reason i cant seems to capture the `seed` property on the `api/games/anchor` request
  // not sure why zzz
  // probably cuz i did something wrong

  let interval = setInterval(() => 
  {
    if (!!window?.msgpackr)
    {
      clearInterval(interval)

      _injectWS()
      _injectXHR()
    }
  }, 1000)

  function _injectWS()
  {
    const _globalPackr = new window.msgpackr.Packr({
      bundleStrings: true
    })
    
    const _unpackr = new window.msgpackr.Unpackr({
      bundleStrings: false,
      sequential: true,
      structures: []
    })

    let _WebSocket        = window.WebSocket
    let _addEventListener = _WebSocket.prototype.addEventListener

    _addEventListener = _addEventListener.call.bind(_addEventListener)
    window.WebSocket  = function (x, y)
    {
      // there's gonna be only like one connection so
      const ws = new _WebSocket(x, y)
      
      _addEventListener(ws, "message", (msg) => 
      {
        new Response(msg.data).arrayBuffer()
        .then(h => 
        {
          const data = decode(new Uint8Array(h), _unpackr)
          log(data, false)
        })
      })
      
      return ws
    }

    window.WebSocket.bind()

    window.WebSocket.prototype             = _WebSocket.prototype
    window.WebSocket.prototype.constructor = window.WebSocket

    let _send = _WebSocket.prototype.send
  
    _send = _send.apply.bind(_send)
    _WebSocket.prototype.send = function (data) 
    {
      new Response(data).arrayBuffer()
      .then(h => 
      {
        const msg = decode(new Uint8Array(h), _unpackr)
        log(msg, true)
      })
    
      return _send(this, arguments)
    }

    const RIBBON_TAG = {
      STANDARD_ID: 0x45, // base
      EXTRACTED_ID: 0xAE, // buffer packets
      BATCH: 0x58,
      EXTENSION: 0xB0
    }

    const EXTENSION_TAG = {
      PING: 0x0B, // client
      PONG: 0x0C  // server
    }

    function decode(packet, unpackr)
    {
      if (packet[0] === RIBBON_TAG.STANDARD_ID) return unpackr.unpackMultiple(packet.slice(1))

      else if (packet[0] === RIBBON_TAG.EXTRACTED_ID)
      {
        const message = _globalPackr.unpack(packet.slice(5))
        const view    = new DataView(packet.buffer)

        message.id = view.getUint32(1, false)

        return [message]
      }

      else if (packet[0] === RIBBON_TAG.BATCH)
      {
        const items   = []
        const lengths = []
        
        const batchView = new DataView(packet.buffer)

        for (let i = 0; true; i++) 
        {
          const length = batchView.getUint32(1 + (i * 4), false)
          
          if (length === 0) break
          
          lengths.push(length)
        }

        let pointer = 0
        
        for (let i = 0; i < lengths.length; i++) 
        {
          items.push(packet.slice(1 + (lengths.length * 4) + 4 + pointer, 1 + (lengths.length * 4) + 4 + pointer + lengths[i]))
          pointer += lengths[i];
        }

        return [].concat(...items.map(item => decode(item, unpackr)))
      }

      else if (packet[0] === RIBBON_TAG.EXTENSION)
      {
        if (packet[1] === EXTENSION_TAG.PONG) return [{ command: "pong" }]
        else return []                
      }

      else return [unpackr.unpack(packet)]
    }

    /*function decodeBuffer()
    {
    
    }*/

    function log(msg, send)
    {
      // dont wanna log ping and pong messages
      if (msg.length === 0) return
      if (msg[0].command === "pong") return
    
      for (let i = 0; i < msg.length; i ++)
      {
        const message = msg[i]

        console.log(
          "%c [RIBBON] %c %s %c %s ",
          "color: #0F172A; font-weight: bold; background: #A855F7;",
          "color: #0F172A; font-weight: bold; background: #C084FC;",
          send ? ">>>" : "<<<",
          "color: #0F172A; font-weight: bold; background: #D8B4FE;",
          `${message.command}`
        )
        
        console.log(message.data || null)

        // messages can have packets so
        if ((message?.packets?.length || 0) > 0)
        {
          for (let j = 0; j < message.packets.length; j++)
          {
            console.log(
              "%c [RIBBON] %c %s %c %s ",
              "color: #0F172A; font-weight: bold; background: #A855F7;",
              "color: #0F172A; font-weight: bold; background: #C084FC;",
              send ? ">>>" : "<<<",
              "color: #0F172A; font-weight: bold; background: #D8B4FE;",
              `${message.packets[j].command}`
            )
          
            console.log(message.packets[j].data || null)
          }
        }
      }
    }    
  }
  ///////
  function _injectXHR()
  {
    window.msgpackr.addExtension({
      type: 1,
      read: (e) => (null === e ? { success: true } : { success: true, ...e })
    })

    window.msgpackr.addExtension({
      type: 2,
      read: (e) => (null === e ? { success: false } : { success: false, error: e })
    })

    const { unpack } = new window.msgpackr.Unpackr({
      bundleStrings: true
    })
  
    const _xhr  = XMLHttpRequest.prototype
    const _open = _xhr.open
    const _send = _xhr.send

    _xhr.open = function(method, url) 
    {
      this._method = method
      this._url    = url
      
      return _open.apply(this, arguments)
    }

    _xhr.send = function(data) 
    {
      this.addEventListener("load", function() 
      {
        this._body = data

        //ignore spool checking and bgm request
        if (this._url.includes("spool")) return
        if (this._url.endsWith(".mp3")) return
       
        console.log(
          "%c [REQUEST] %c %s %c %s ",
          "color: #0F172A; font-weight: bold; background: #14B8A6;",
          "color: #0F172A; font-weight: bold; background: #2DD4BF;",
          this._method,
          "color: #0F172A; font-weight: bold; background: #5EEAD4;",
          this._url.replace("https://", "")
        )

        if (this.getResponseHeader("Content-Type").split(";")[0] === "application/json") console.log(JSON.parse(this.response))
        else console.log(unpack(new Uint8Array(this.response)))    
      })
      
      return _send.apply(this, arguments)
    }
  }
}
