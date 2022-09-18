import { useState, useEffect, useContext } from 'react'

import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react'

import OBSContext from './lib/obsContext'

export default function SceneList() {
  const obs = useContext(OBSContext)

  const [ scenes, setScenes ] = useState()
  const [ currentSceneName, setCurrentSceneName ] = useState()
  
  useEffect(() => {
    function changed(data) {
      if (data.scenes)
        setScenes(data.scenes)
      if (data.currentProgramSceneName)
        setCurrentSceneName(data.currentProgramSceneName)
    }

    obs.call('GetSceneList').then(changed)
    obs.call('GetCurrentProgramScene').then(changed)
    obs.on('SceneListChanged', changed)
    obs.on('CurrentProgramSceneChanged', changed)
    return () => {
      obs.off('SceneListChanged', changed)
      obs.off('CurrentProgramSceneChanged', changed)
    }
  })

  function setScene(name) {
    obs.call('SetCurrentProgramScene', { sceneName: name })
  }

  return <SlTree>
    {scenes?.map(({sceneName}) =>
      <SlTreeItem key={sceneName} selected={sceneName === currentSceneName} onClick={() => setScene(sceneName)}>
        {sceneName}
      </SlTreeItem>
    )}
  </SlTree>
}