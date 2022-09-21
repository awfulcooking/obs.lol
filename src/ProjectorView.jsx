import { useEffect, useState } from 'react'
import useOBS from './lib/useOBS'

import Projector from './Projector'

export default function ProjectorView(props) {
  const obs = useOBS()
  const [ source, setSource ] = useState()

  useEffect(() => {
    function sceneChanged({ sceneName }) {
      setSource(sceneName)
    }

    obs.call('GetCurrentProgramScene').then(({ currentProgramSceneName }) => {
      setSource(currentProgramSceneName)
    })

    obs.on('CurrentProgramSceneChanged', sceneChanged)
    return () => obs.off('CurrentProgramSceneChanged', sceneChanged)
  }, [])

  return <Projector sourceName={source} {...props} />
}
