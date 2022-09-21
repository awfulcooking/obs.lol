import { useState, useEffect } from 'react'
import setAsyncInterval from './lib/setAsyncInterval'
import useOBS from './lib/useOBS'

export default function Projector({ sourceName, refreshInterval = null }) {
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
      return

    const { imageData } = await obs.call('GetSourceScreenshot', {
      sourceName,
      imageFormat: 'png',
    })

    setImage(imageData)
  }

  return <img src={image} alt={`Screenshot of ${sourceName}`} />
}
