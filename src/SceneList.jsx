import { List, ListItem, ListItemButton } from '@mui/material'
import { useState, useEffect } from 'react'

import useOBS from './lib/useOBS'

export default function SceneList({ onSceneSelect }) {
  const obs = useOBS()

  const [ scenes, setScenes ] = useState()
  const [ currentSceneName, setCurrentSceneName ] = useState()

  useEffect(() => {
    function changed(data) {
      if (data.scenes)
        setScenes(data.scenes)

      if (data.currentProgramSceneName) {
        onSceneSelect?.(data.currentProgramSceneName)
        setCurrentSceneName(data.currentProgramSceneName)
      }
    }

    obs.call('GetSceneList').then(changed)
    obs.call('GetCurrentProgramScene').then(changed)
  
    obs.on('SceneListChanged', changed)
    obs.on('CurrentProgramSceneChanged', changed)
    return () => {
      obs.off('SceneListChanged', changed)
      obs.off('CurrentProgramSceneChanged', changed)
    }
  }, [])

  async function setScene(name) {
    await obs.call('SetCurrentProgramScene', { sceneName: name })
    setCurrentSceneName(name)
    onSceneSelect?.(name)
  }

  return <List>
    {scenes?.map(({sceneName}) =>
      <ListItemButton key={sceneName} selected={sceneName === currentSceneName} onClick={() => setScene(sceneName)}>
        {sceneName}
      </ListItemButton>
    )}
  </List>
}