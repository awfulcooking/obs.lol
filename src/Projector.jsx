import { useState, useEffect } from 'react'
import setAsyncInterval from './lib/setAsyncInterval'
import useOBS from './lib/useOBS'

export default function Projector({ sourceName, refreshInterval = null, align = "center", justify = "center" }) {
  const obs = useOBS()
  const [ image, setImage ] = useState()

  useEffect(() => {
    refresh()
  }, [ sourceName ])

  useEffect(() => {
    if (refreshInterval == null)
      return;

    return setAsyncInterval(refresh, refreshInterval)
  }, [ sourceName, refreshInterval ])

  async function refresh() {
    if (!sourceName)
      return setImage(null)

    const { imageData } = await obs.call('GetSourceScreenshot', {
      sourceName,
      imageFormat: 'jpg',
    })

    setImage(imageData)
  }

  if (!image)
    return

  return <div style={{ display: 'flex', height: '100%', justifyContent: justify, alignItems: align }}>
    <img src={image} alt={`Screenshot of ${sourceName}`} style={{
      maxWidth: '100%',
      maxHeight: '100%',
    }} />
  </div>
}
