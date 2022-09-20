import React, { useState, useEffect } from 'react'
import OBSWebSocket from 'obs-websocket-js'

import OBSContext from './lib/obsContext'
import ConnectForm from './ConnectForm'

window.OWS = OBSWebSocket
const obs = new OBSWebSocket()
window.obs = obs

export default function Connection({ children }) {
  const [ connected, setConnected ] = useState()

  useEffect(() => {
    const onDisconnect = (err) => {
      console.warn('OBS connection closed', err)
      setConnected(false)
    }

    obs.on('ConnectionError', onDisconnect)
    obs.on('ConnectionClosed', onDisconnect)
    return () => {
      obs.off('ConnectionError', onDisconnect)
      obs.off('ConnectionClosed', onDisconnect)
    }
  })

  const content = connected
    ? children
    : <ConnectForm onConnect={() => setConnected(true)} />

  return <OBSContext.Provider value={obs}>
    {content}
  </OBSContext.Provider>
}
