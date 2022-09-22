import { List, ListItemButton } from '@mui/material'
import { useState, useEffect } from 'react'

import useOBS from './lib/useOBS'

export default function SourceList({ sceneName, selectedSource, onSourceSelect, autoSelectFirst }) {
  const obs = useOBS()
  const [ sources, setSources ] = useState()

  useEffect(() => {
    function changed(data) {
      if (data.sceneItems)
        setSources(data.sceneItems)
    }

    function refresh() {
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

  useEffect(() => {
    if (selectedSource || !sources?.[0])
      return;

    onSourceSelect?.(sources[0].sourceName)
  }, [ sources?.[0] ])

  return <List>
    {sources?.map(({sourceName}) =>
      <ListItemButton key={sourceName} selected={sourceName === selectedSource} onClick={() => onSourceSelect?.(sourceName)}>
        {sourceName}
      </ListItemButton>
    )}
  </List>
}