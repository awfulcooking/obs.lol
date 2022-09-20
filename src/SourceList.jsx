import { List, ListItemButton } from '@mui/material'
import { useState, useEffect, useContext } from 'react'

import OBSContext from './lib/obsContext'

export default function SourceList({ sceneName, onSourceSelect }) {
  const obs = useContext(OBSContext)

  const [ sources, setSources ] = useState()
  const [ currentSourceName, setCurrentSourceName ] = useState()

  useEffect(() => {
    function changed(data) {
      if (data.sceneItems)
        setSources(data.sceneItems)

      console.log(data.sceneItems)
    }

    function refresh() {
      console.debug('Refresh sources list')
      obs.call('GetSceneItemList', { sceneName }).then(changed)
    }

    if (sceneName)
      refresh()

    obs.on('SceneItemCreated', refresh)
    obs.on('SceneItemRemoved', refresh)
    obs.on('SceneItemListReindexed', refresh)
    obs.on('SceneItemEnableStateChanged', refresh)
    obs.on('SceneItemLockStateChanged', refresh)

    return () => {
      obs.off('SceneItemCreated', refresh)
      obs.off('SceneItemRemoved', refresh)
      obs.off('SceneItemListReindexed', refresh)
      obs.off('SceneItemEnableStateChanged', refresh)
      obs.off('SceneItemLockStateChanged', refresh)
    }
  }, [ sceneName ])

  return <List>
    {sources?.map(({sourceName}) =>
      <ListItemButton key={sourceName} selected={sourceName === currentSourceName} onClick={() => onSourceSelect?.(sourceName)}>
        {sourceName}
      </ListItemButton>
    )}
  </List>
}