import React, { useState, useEffect } from 'react'
import OBSWebSocket from 'obs-websocket-js'

import OBSContext from './lib/obsContext'
import ConnectForm from './ConnectForm'

window.OWS = OBSWebSocket
const obs = new OBSWebSocket()
window.obs = obs

obs.on('ConnectionOpened', () => console.info('OBS connection opened'))
obs.on('ConnectionClosed', () => console.info('OBS connection closed'))
obs.on('ConnectionClose', () => console.info('OBS connection close'))
obs.on('ConnectionError', () => console.info('OBS connection error'))

export default function Connection({ children }) {
  const [ connected, setConnected ] = useState()

  useEffect(() => {
    const onDisconnect = (err) => {
      console.warn('OBS connection closed', err)
      setConnected(false)
    }

    obs.on('ConnectionError', onDisconnect)
    return () => obs.off('ConnectionError', onDisconnect)
  })

  const content = connected
    ? children
    : <ConnectForm onConnect={() => setConnected(true)} />

  return <OBSContext.Provider value={obs}>
    {content}
  </OBSContext.Provider>
}
